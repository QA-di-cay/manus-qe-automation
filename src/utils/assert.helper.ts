import { expect } from '@playwright/test';

export async function assertSortedAsc(values: (string | number)[]) {
    const sorted = [...values].sort((a, b) =>
        typeof a === 'number' && typeof b === 'number'
            ? a - b
            : String(a).localeCompare(String(b))
    );
    expect(values).toEqual(sorted);
}

export async function assertSortedDesc(values: (string | number)[]) {
    const sorted = [...values].sort((a, b) =>
        typeof a === 'number' && typeof b === 'number'
            ? b - a
            : String(b).localeCompare(String(a))
    );
    expect(values).toEqual(sorted);
}
