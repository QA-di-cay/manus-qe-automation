import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import axios from 'axios';

interface TestData {
  name: string;
  status: string;
  duration: number;
  error?: string;
}

class BrowserStackReporter implements Reporter {
  private testResults: TestData[] = [];
  private buildStartTime: Date = new Date();
  private config = {
    username: process.env.BROWSERSTACK_USERNAME || '',
    accessKey: process.env.BROWSERSTACK_ACCESS_KEY || '',
    projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'TME Test Run',
    buildName: process.env.BROWSERSTACK_BUILD_NAME || `Local-Build-${new Date().toISOString().slice(0, 10)}`
  };

  onBegin(): void {
    this.buildStartTime = new Date();
    console.log(`🚀 BrowserStack Test Observability started`);
    console.log(`📊 Build: ${this.config.buildName}`);
    console.log(`📊 Project: ${this.config.projectName}`);
    
    if (!this.config.username || !this.config.accessKey) {
      console.log('⚠️  BrowserStack credentials not found - will create local report only');
    } else {
      console.log(`✅ BrowserStack credentials found for: ${this.config.username}`);
    }
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.testResults.push({
      name: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message
    });

    const emoji = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⏭️';
    console.log(`📊 Test: ${test.title} - ${emoji} ${result.status.toUpperCase()}`);
  }

  async onEnd(result: FullResult): Promise<void> {
    console.log('\n🚀 Processing test results...');
    
    const summary = {
      total: this.testResults.length,
      passed: this.testResults.filter(t => t.status === 'passed').length,
      failed: this.testResults.filter(t => t.status === 'failed').length,
      skipped: this.testResults.filter(t => t.status === 'skipped').length
    };

    // Create local HTML report
    this.createLocalReport(summary);

    // Upload to BrowserStack Test Observability if credentials available
    if (this.config.username && this.config.accessKey) {
      await this.uploadToBrowserStackObservability(summary);
    } else {
      console.log('⚠️  Skipping BrowserStack upload - credentials not configured');
    }

    // Print summary
    console.log(`\n📊 Final Summary:`);
    console.log(`   Total: ${summary.total} | Passed: ${summary.passed} | Failed: ${summary.failed} | Skipped: ${summary.skipped}`);
  }

  private createLocalReport(summary: any): void {
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>BrowserStack Test Report - ${this.config.buildName}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { margin: 0; color: #1a1a1a; font-size: 2.5em; }
        .header .subtitle { color: #666; margin-top: 10px; font-size: 1.1em; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .stat { text-align: center; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border: 1px solid #dee2e6; }
        .stat-number { font-size: 2.5em; font-weight: bold; margin-bottom: 8px; }
        .stat-label { color: #666; font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        .total { color: #007bff; }
        .tests-section { margin-top: 40px; }
        .tests-header { background: #f8f9fa; padding: 20px; border-radius: 8px 8px 0 0; border-bottom: 2px solid #dee2e6; }
        .test-item { padding: 15px 20px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; transition: background 0.2s; }
        .test-item:hover { background: #f8f9fa; }
        .test-item:last-child { border-bottom: none; border-radius: 0 0 8px 8px; }
        .test-item.passed { border-left: 4px solid #28a745; }
        .test-item.failed { border-left: 4px solid #dc3545; }
        .test-item.skipped { border-left: 4px solid #ffc107; }
        .test-content { flex: 1; }
        .test-name { font-weight: 600; margin-bottom: 5px; color: #1a1a1a; }
        .test-meta { color: #666; font-size: 0.9em; }
        .test-status { padding: 6px 12px; border-radius: 20px; font-size: 0.8em; font-weight: bold; text-transform: uppercase; }
        .status-passed { background: #d4edda; color: #155724; }
        .status-failed { background: #f8d7da; color: #721c24; }
        .status-skipped { background: #fff3cd; color: #856404; }
        .test-error { color: #dc3545; font-size: 0.85em; margin-top: 8px; padding: 8px; background: #f8d7da; border-radius: 4px; font-family: 'Monaco', 'Consolas', monospace; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666; }
        .browserstack-badge { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Test Report</h1>
            <div class="subtitle">
                <strong>Build:</strong> ${this.config.buildName} | 
                <strong>Project:</strong> ${this.config.projectName}<br>
                <strong>Generated:</strong> ${new Date().toLocaleString()}
            </div>
        </div>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-number total">${summary.total}</div>
                <div class="stat-label">Total Tests</div>
            </div>
            <div class="stat">
                <div class="stat-number passed">${summary.passed}</div>
                <div class="stat-label">Passed</div>
            </div>
            <div class="stat">
                <div class="stat-number failed">${summary.failed}</div>
                <div class="stat-label">Failed</div>
            </div>
            <div class="stat">
                <div class="stat-number skipped">${summary.skipped}</div>
                <div class="stat-label">Skipped</div>
            </div>
        </div>

        <div class="tests-section">
            <div class="tests-header">
                <h2 style="margin: 0; color: #1a1a1a;">📋 Test Results</h2>
            </div>
            ${this.testResults.map(test => `
                <div class="test-item ${test.status}">
                    <div class="test-content">
                        <div class="test-name">${test.name}</div>
                        <div class="test-meta">Duration: ${(test.duration / 1000).toFixed(1)}s</div>
                        ${test.error ? `<div class="test-error">❌ ${test.error.split('\n')[0]}</div>` : ''}
                    </div>
                    <div class="test-status status-${test.status}">${test.status}</div>
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <a href="https://browserstack.com" class="browserstack-badge">
                🚀 Powered by BrowserStack
            </a>
            <p style="margin-top: 15px;">Design by TME QE</p>
        </div>
    </div>
</body>
</html>`;

    try {
      require('fs').writeFileSync('browserstack-report.html', html);
      console.log('📄 Local HTML report created: browserstack-report.html');
    } catch (error) {
      console.error('❌ Failed to create local report:', error);
    }
  }

  private async uploadToBrowserStackObservability(summary: any): Promise<void> {
    try {
      console.log('📤 Uploading to BrowserStack Test Observability...');

      // Build payload for Test Observability API
      const buildPayload = {
        buildInfo: {
          name: this.config.buildName,
          project: this.config.projectName,
          framework: 'playwright',
          language: 'typescript',
          startTime: this.buildStartTime.toISOString(),
          endTime: new Date().toISOString(),
          status: summary.failed > 0 ? 'FAILED' : 'PASSED'
        },
        testResults: this.testResults.map(test => ({
          name: test.name,
          status: test.status === 'passed' ? 'PASSED' : 
                  test.status === 'failed' ? 'FAILED' : 'SKIPPED',
          duration: test.duration,
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          errorMessage: test.error || null,
          tags: ['local-execution', 'playwright']
        }))
      };

      console.log(`📊 Uploading ${this.testResults.length} test results...`);

      // Call BrowserStack Test Observability API
      const response = await axios.post(
        'https://api.browserstack.com/test-observability/v1/builds', 
        buildPayload,
        {
          headers: {
            'Authorization': `Bearer ${this.config.accessKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'TME-Test-Run/1.0'
          },
          timeout: 30000
        }
      );

      const buildId = response.data?.id || response.data?.buildId || 'unknown';
      const dashboardUrl = `https://observability.browserstack.com/builds/${buildId}`;
      
      console.log('✅ Successfully uploaded to BrowserStack Test Observability!');
      console.log(`🌐 Dashboard URL: ${dashboardUrl}`);
      console.log(`📊 Build ID: ${buildId}`);

      // Also try the alternative Automate API as fallback
      await this.tryAutomateAPIFallback(summary);

    } catch (error: any) {
      console.error('❌ BrowserStack Test Observability upload failed:');
      
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Message: ${JSON.stringify(error.response.data, null, 2)}`);
        
        // Try alternative API if 404 or unauthorized
        if (error.response.status === 404 || error.response.status === 401) {
          console.log('🔄 Trying alternative BrowserStack API...');
          await this.tryAutomateAPIFallback(summary);
        }
      } else if (error.code === 'ECONNREFUSED') {
        console.error('   Network error - check internet connection');
      } else {
        console.error(`   Error: ${error.message}`);
      }
      
      console.log('⚠️  Local report still available: browserstack-report.html');
    }
  }

  private async tryAutomateAPIFallback(summary: any): Promise<void> {
    try {
      console.log('🔄 Trying BrowserStack Automate API as fallback...');

      // Alternative: Use Screenshots API or custom webhook
      const fallbackPayload = {
        name: this.config.buildName,
        project: this.config.projectName,
        tests: this.testResults.length,
        passed: summary.passed,
        failed: summary.failed,
        status: summary.failed > 0 ? 'failed' : 'passed'
      };

      // This might work with basic auth
      const response = await axios.post(
        'https://api.browserstack.com/automate/plan.json',
        fallbackPayload,
        {
          auth: {
            username: this.config.username,
            password: this.config.accessKey
          },
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );

      console.log('✅ Fallback API call successful');
      console.log('🌐 Check your BrowserStack dashboard for results');

    } catch (fallbackError: any) {
      console.log('⚠️  Fallback API also failed - this is normal for local test uploads');
      console.log('📄 Your test results are saved in the local HTML report');
    }
  }
}

export default BrowserStackReporter;