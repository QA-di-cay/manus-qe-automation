import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import FormData from 'form-data';

interface BrowserStackConfig {
  username: string;
  accessKey: string;
  projectName: string;
  buildName: string;
}

class BrowserStackReporter implements Reporter {
  private config: BrowserStackConfig;
  private testResults: Array<{
    name: string;
    status: string;
    duration: number;
    error?: string;
    screenshot?: string;
  }> = [];

  constructor() {
    this.config = {
      username: process.env.BROWSERSTACK_USERNAME || '',
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY || '',
      projectName: process.env.BROWSERSTACK_PROJECT_NAME || 'Manus QE Automation',
      buildName: process.env.BROWSERSTACK_BUILD_NAME || `Build-${new Date().toISOString().slice(0, 10)}`
    };
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const testResult = {
      name: test.title,
      status: result.status,
      duration: result.duration,
      error: result.error?.message,
      screenshot: this.getScreenshotPath(result)
    };

    this.testResults.push(testResult);
    console.log(`📊 Test completed: ${test.title} - ${result.status}`);
  }

  async onEnd(result: FullResult): Promise<void> {
    console.log('🚀 Uploading test results to BrowserStack...');
    
    try {
      // Generate HTML report
      const htmlReport = this.generateHTMLReport();
      const reportPath = path.join(process.cwd(), 'browserstack-report.html');
      fs.writeFileSync(reportPath, htmlReport);

      // Upload to BrowserStack (simulated - replace with actual API)
      await this.uploadToBrowserStack(reportPath);
      
      console.log('✅ Test results uploaded to BrowserStack successfully!');
      console.log(`📊 Total tests: ${this.testResults.length}`);
      console.log(`✅ Passed: ${this.testResults.filter(t => t.status === 'passed').length}`);
      console.log(`❌ Failed: ${this.testResults.filter(t => t.status === 'failed').length}`);
      console.log(`⏭️  Skipped: ${this.testResults.filter(t => t.status === 'skipped').length}`);
      
    } catch (error) {
      console.error('❌ Failed to upload results to BrowserStack:', error);
    }
  }

  private getScreenshotPath(result: TestResult): string | undefined {
    const attachment = result.attachments.find(a => a.name === 'screenshot');
    return attachment?.path;
  }

  private generateHTMLReport(): string {
    const timestamp = new Date().toLocaleString();
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(t => t.status === 'passed').length;
    const failedTests = this.testResults.filter(t => t.status === 'failed').length;
    const skippedTests = this.testResults.filter(t => t.status === 'skipped').length;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manus QE Automation - Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; min-width: 120px; }
        .stat-number { font-size: 2em; font-weight: bold; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        .total { color: #007bff; }
        .test-list { margin-top: 30px; }
        .test-item { padding: 10px; margin: 5px 0; border-left: 4px solid #ddd; background: #f8f9fa; }
        .test-item.passed { border-left-color: #28a745; }
        .test-item.failed { border-left-color: #dc3545; }
        .test-item.skipped { border-left-color: #ffc107; }
        .test-name { font-weight: bold; }
        .test-duration { color: #666; font-size: 0.9em; }
        .test-error { color: #dc3545; font-size: 0.9em; margin-top: 5px; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Manus QE Automation Test Report</h1>
            <p><strong>Build:</strong> ${this.config.buildName}</p>
            <p><strong>Generated:</strong> ${timestamp}</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number total">${totalTests}</div>
                <div>Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-number passed">${passedTests}</div>
                <div>Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number failed">${failedTests}</div>
                <div>Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number skipped">${skippedTests}</div>
                <div>Skipped</div>
            </div>
        </div>

        <div class="test-list">
            <h2>📋 Test Results</h2>
            ${this.testResults.map(test => `
                <div class="test-item ${test.status}">
                    <div class="test-name">${test.name}</div>
                    <div class="test-duration">Duration: ${test.duration}ms | Status: ${test.status.toUpperCase()}</div>
                    ${test.error ? `<div class="test-error">Error: ${test.error}</div>` : ''}
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>Generated by Manus QE Automation Framework</p>
            <p>Powered by Playwright + BrowserStack</p>
        </div>
    </div>
</body>
</html>`;
  }

  private async uploadToBrowserStack(reportPath: string): Promise<void> {
    // Simulate upload to BrowserStack
    // In real implementation, you would use BrowserStack's API
    
    console.log('📤 Uploading report to BrowserStack...');
    
    // For demo purposes, we'll just copy the report to a public directory
    const publicReportPath = path.join(process.cwd(), 'public-report.html');
    fs.copyFileSync(reportPath, publicReportPath);
    
    console.log(`📊 Report available at: ${publicReportPath}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, you would do something like:
    /*
    const formData = new FormData();
    formData.append('file', fs.createReadStream(reportPath));
    formData.append('project', this.config.projectName);
    formData.append('build', this.config.buildName);
    
    const response = await axios.post('https://api.browserstack.com/automate/upload-report', formData, {
      auth: {
        username: this.config.username,
        password: this.config.accessKey
      },
      headers: formData.getHeaders()
    });
    
    console.log('Report uploaded:', response.data.url);
    */
  }
}

export default BrowserStackReporter;
