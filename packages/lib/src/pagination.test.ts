import { describe, it, expect } from 'vitest';
import { encodeCursor, decodeCursor } from './pagination';

describe('pagination cursors', () => {
  describe('encodeCursor', () => {
    it('encodes a string value', () => {
      const result = encodeCursor('test_cursor');
      expect(result).toBe('InRlc3RfY3Vyc29yIg');
    });

    it('encodes a number value', () => {
      const result = encodeCursor(12345);
      expect(result).toBe('MTIzNDU');
    });

    it('encodes an object value', () => {
      const result = encodeCursor({ id: 1, name: 'test' });
      expect(result).toBe('eyJpZCI6MSwibmFtZSI6InRlc3QifQ');
    });

    it('encodes an array value', () => {
      const result = encodeCursor([1, 2, 3]);
      expect(result).toBe('WzEsMiwzXQ');
    });

    it('encodes null', () => {
        const result = encodeCursor(null);
        expect(result).toBe('bnVsbA');
    });
  });

  describe('decodeCursor', () => {
    it('decodes a string value', () => {
      const encoded = encodeCursor('test_cursor');
      const result = decodeCursor<string>(encoded);
      expect(result).toBe('test_cursor');
    });

    it('decodes a number value', () => {
      const encoded = encodeCursor(12345);
      const result = decodeCursor<number>(encoded);
      expect(result).toBe(12345);
    });

    it('decodes an object value', () => {
      const encoded = encodeCursor({ id: 1, name: 'test' });
      const result = decodeCursor<{ id: number; name: string }>(encoded);
      expect(result).toEqual({ id: 1, name: 'test' });
    });

    it('decodes an array value', () => {
      const encoded = encodeCursor([1, 2, 3]);
      const result = decodeCursor<number[]>(encoded);
      expect(result).toEqual([1, 2, 3]);
    });

    it('returns undefined for missing or empty cursor', () => {
      expect(decodeCursor()).toBeUndefined();
      expect(decodeCursor(null)).toBeUndefined();
      expect(decodeCursor('')).toBeUndefined();
    });

    it('throws error for invalid base64/JSON string', () => {
      expect(() => decodeCursor('not_base64_json')).toThrow();
    });
  });
});
