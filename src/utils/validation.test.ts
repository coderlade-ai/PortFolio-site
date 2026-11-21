import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, validateEmail } from './validation';

test('validateEmail accepts standard and multi-subdomain emails', () => {
  assert.equal(validateEmail('admin@ladestack.in').isValid, true);
  assert.equal(validateEmail('alex.dev+portfolio@sub.example.co.uk').isValid, true);
  assert.equal(validateEmail('  hello@domain.io  ').isValid, true);
});

test('validateEmail rejects malformed email addresses with descriptive errors', () => {
  const cases = [
    '',
    'plainaddress',
    'user@',
    '@example.com',
    'user name@example.com',
    'user..dots@example.com',
    '.leading@example.com',
    'trailing.@example.com',
    'user@localhost',
    'user@domain.c',
    'user@-domain.com',
    'user@domain..com',
  ];

  for (const invalid of cases) {
    const res = validateEmail(invalid);
    assert.equal(res.isValid, false, `Expected "${invalid}" to be invalid`);
    assert.ok(res.error && res.error.length > 0, `Expected error message for "${invalid}"`);
  }
});

test('validateEmail detects common typo domains while keeping validity', () => {
  const res = validateEmail('girish@gmial.com');
  assert.equal(res.isValid, true);
  assert.equal(res.suggestion, 'girish@gmail.com');
});

test('validateContactForm rejects empty or short fields', () => {
  const result = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    topic: 'Collaboration',
    message: 'Too short',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});

test('validateContactForm passes on complete valid inquiry', () => {
  const result = validateContactForm({
    name: 'Priya Deshmukh',
    email: 'priya@studio.in',
    topic: 'Developer Tools',
    message: 'Hi Girish, I would love to discuss an open-source browser utility collaboration.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});
