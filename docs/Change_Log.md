# Change Log

>danger
>API and Gateway versions below v6 will be discontinued on October 16, 2017, after which they will be non-functioning.

## July 24, 2017

Audit logs are here! Well, they've been here all along, but now we've got [documentation](#DOCS_AUDIT_LOG/audit-logs) about them. Check it out, but remember: with great power comes great responsibility.

## July 19, 2017 — Version 6 Breaking Changes

* [Channel](#DOCS_CHANNEL/channel-object) Object
  * `is_private` removed
  * [`type`](#DOCS_CHANNEL/channel-object-channel-types) is now an integer
  * `recipient` is now `recipients`, an array of [user](#DOCS_USER/user-object) objects
* [Message](#DOCS_CHANNEL/message-object) Object
  * [`type`](#DOCS_CHANNEL/message-object-message-types) added to support system messages
* [Status Update](#DOCS_GATEWAY/gateway-status-update-gateway-status-update-structure) Object
  * `idle_since` renamed to `since`