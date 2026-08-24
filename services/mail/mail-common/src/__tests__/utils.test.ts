//
// Copyright © 2026 OpenSrcs.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import { getEmailMessageIdFromClubId, getClubIdFromEmailMessageId, isClubEmailMessageId } from '../utils'

describe('Email Message ID Conversion', () => {
  describe('getEmailMessageIdFromClubId', () => {
    it('should convert club ID to email Message-ID format', () => {
      const clubId = 'msg_123456789abcdef'
      const email = 'user@example.com'
      const result = getEmailMessageIdFromClubId(clubId, email)
      expect(result).toBe('<msg_123456789abcdef@example.com>')
    })

    it('should handle different domains', () => {
      const clubId = 'club_message_001'
      const email = 'admin@company.org'
      const result = getEmailMessageIdFromClubId(clubId, email)
      expect(result).toBe('<club_message_001@company.org>')
    })

    it('should handle subdomain emails', () => {
      const clubId = 'test_msg'
      const email = 'support@mail.example.com'
      const result = getEmailMessageIdFromClubId(clubId, email)
      expect(result).toBe('<test_msg@mail.example.com>')
    })

    it('should handle complex club IDs', () => {
      const clubId = 'channel_123_thread_456_msg_789'
      const email = 'team@startup.io'
      const result = getEmailMessageIdFromClubId(clubId, email)
      expect(result).toBe('<channel_123_thread_456_msg_789@startup.io>')
    })

    it('should throw error for invalid email', () => {
      const clubId = 'msg_123'
      const invalidEmail = 'not-an-email'
      expect(() => getEmailMessageIdFromClubId(clubId, invalidEmail)).toThrow('Invalid email address')
    })
  })

  describe('getClubIdFromEmailMessageId', () => {
    it('should extract club ID from email Message-ID', () => {
      const messageId = '<msg_123456789abcdef@example.com>'
      const email = 'user@example.com'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBe('msg_123456789abcdef')
    })

    it('should handle Message-ID without angle brackets', () => {
      const messageId = 'msg_123456789abcdef@example.com'
      const email = 'user@example.com'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBe('msg_123456789abcdef')
    })

    it('should return undefined for non-matching domain', () => {
      const messageId = '<msg_123@example.com>'
      const email = 'user@different.com'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBeUndefined()
    })

    it('should handle complex domains', () => {
      const messageId = '<channel_123_thread_456@mail.company.org>'
      const email = 'admin@mail.company.org'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBe('channel_123_thread_456')
    })

    it('should handle empty club ID part', () => {
      const messageId = '<@example.com>'
      const email = 'user@example.com'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBe('')
    })

    it('should return undefined for standard email Message-IDs', () => {
      const messageId = '<CABc1234567890abcdef@mail.gmail.com>'
      const email = 'user@example.com'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBeUndefined()
    })

    it('should handle multiple @ symbols in Message-ID', () => {
      const messageId = '<msg@test@example.com>'
      const email = 'user@example.com'
      const result = getClubIdFromEmailMessageId(messageId, email)
      expect(result).toBe('msg@test')
    })

    it('should throw error for invalid email', () => {
      const messageId = '<msg_123@example.com>'
      const invalidEmail = 'not-an-email'
      expect(() => getClubIdFromEmailMessageId(messageId, invalidEmail)).toThrow('Invalid email address')
    })
  })

  describe('isClubEmailMessageId', () => {
    it('should return true for valid club Message-ID', () => {
      const messageId = '<msg_123456789abcdef@example.com>'
      const email = 'user@example.com'
      const result = isClubEmailMessageId(messageId, email)
      expect(result).toBe(true)
    })

    it('should return false for non-matching domain', () => {
      const messageId = '<msg_123@example.com>'
      const email = 'user@different.com'
      const result = isClubEmailMessageId(messageId, email)
      expect(result).toBe(false)
    })

    it('should return false for standard email Message-IDs', () => {
      const messageId = '<CABc1234567890abcdef@mail.gmail.com>'
      const email = 'user@example.com'
      const result = isClubEmailMessageId(messageId, email)
      expect(result).toBe(false)
    })

    it('should return true for Message-ID without angle brackets', () => {
      const messageId = 'msg_123456789abcdef@example.com'
      const email = 'user@example.com'
      const result = isClubEmailMessageId(messageId, email)
      expect(result).toBe(true)
    })
  })

  describe('Round-trip conversion', () => {
    it('should preserve club ID through round-trip conversion', () => {
      const originalClubId = 'msg_123456789abcdef'
      const email = 'user@example.com'

      const messageId = getEmailMessageIdFromClubId(originalClubId, email)
      const extractedClubId = getClubIdFromEmailMessageId(messageId, email)

      expect(extractedClubId).toBe(originalClubId)
    })

    it('should work with complex club IDs', () => {
      const originalClubId = 'channel_abc123_thread_def456_msg_789xyz'
      const email = 'team@company.com'

      const messageId = getEmailMessageIdFromClubId(originalClubId, email)
      const extractedClubId = getClubIdFromEmailMessageId(messageId, email)

      expect(extractedClubId).toBe(originalClubId)
    })

    it('should work with subdomain emails', () => {
      const originalClubId = 'notification_001'
      const email = 'alerts@mail.platform.io'

      const messageId = getEmailMessageIdFromClubId(originalClubId, email)
      const extractedClubId = getClubIdFromEmailMessageId(messageId, email)

      expect(extractedClubId).toBe(originalClubId)
    })
  })

  describe('Edge cases', () => {
    it('should handle club ID with special characters', () => {
      const clubId = 'msg-123_test.001'
      const email = 'user@example.com'

      const messageId = getEmailMessageIdFromClubId(clubId, email)
      expect(messageId).toBe('<msg-123_test.001@example.com>')

      const extractedClubId = getClubIdFromEmailMessageId(messageId, email)
      expect(extractedClubId).toBe(clubId)
    })

    it('should handle very long club IDs', () => {
      const clubId = 'very_long_club_id_with_many_segments_and_characters_123456789abcdef'
      const email = 'user@example.com'

      const messageId = getEmailMessageIdFromClubId(clubId, email)
      const extractedClubId = getClubIdFromEmailMessageId(messageId, email)

      expect(extractedClubId).toBe(clubId)
    })

    it('should handle empty club ID', () => {
      const clubId = ''
      const email = 'user@example.com'

      const messageId = getEmailMessageIdFromClubId(clubId, email)
      expect(messageId).toBe('<@example.com>')

      const extractedClubId = getClubIdFromEmailMessageId(messageId, email)
      expect(extractedClubId).toBe('')
    })
  })
})
