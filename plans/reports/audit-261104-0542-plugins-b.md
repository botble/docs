# Audit plugins-b — docs vs code (2026-11-04)

## Scope + repo HEADs
| product | repo HEAD | version (code) | min core / php |
|---|---|---|---|
| live-chat | f8ce8702 2026-10-28 | plugin 1.0.15 | core 7.3.0, php ^8.3\|^8.4\|^8.5 |
| loyalty-points | fdbf8bbc 2026-10-28 | plugin 1.0.20 | core 7.5.0, requires ecommerce |
| pos-pro | 17eee2d9 2026-10-28 | plugin 1.2.21 | core 7.5.0, requires ecommerce |
| product-gifts | c432d5e9 2026-10-28 | plugin 1.0.7 (`ecommerce-product-gifts`) | core 7.6.4 |
| wholesale | a29406eb 2026-11-03 | plugin 1.0.17 (`ecommerce-wholesale`) | core 7.6.0 |
| sms-gateways | 7e30f9c5 2026-10-28 | plugin 1.0.36 | core 7.3.0 |
| sms-gateway (singular) | no repo | — | — |
| cloudify | 1f935aee 2026-10-28 | app 1.3.12 (`platform/packages/cloudify`) | php ^8.3\|^8.4 (no 8.5), minimumPhpVersion 8.3.0 |
| desk-hive | 7ededae1 2026-10-28 | app 1.0.7, support-desk 1.1.3, theme `support` 1.0.0 | php ^8.3\|^8.4\|^8.5 |

Min core versions in docs (7.3/7.5/7.6.4/7.6.0) all match plugin.json. PHP: lead already set 8.3.0; no 8.3.36 left in my folders.

## live-chat
| page | docs claim | code evidence | action |
|---|---|---|---|
| configuration.md | Primary #5A5EB9, hover #4a4ea0, offset 20px | `src/Support/LiveChatHelper.php:235-265` (#82b541, #6a9a35, 40), `resources/sass/live-chat.scss:4-21` | fixed |
| settings.md | Offset default 20px | same | fixed |
| widget-customization.md | CSS var example values | same | fixed |
| configuration.md | permissions table had no agents/snippets flags | `config/permissions.php` (`live-chat.agents.*`, `live-chat.snippets.*`) | fixed (added rows) |
| installation.md | menu = Conversations, Webhooks, Settings; 3 tables | provider `LiveChatServiceProvider.php:145-209` (Conversations, Agents, Team Snippets, Reports, Webhooks, Settings); 7 `bb_live_chat_*` tables | fixed |
| agent-portal.md | URL table missing pages | `routes/web.php:153-174` `/agent/snippets`, `/agent/live-visitors` | fixed (added rows) |
| installation.md | seed `Botble\LiveChat\Database\Seeders\LiveChatSeeder` | class doesn't exist; seeder is `Database\Seeders\LiveChatSeeder` in demo app root, not plugin | needs decision |
| webhooks.md | events message.received, conversation.started; headers | `WebhookService.php:16-18,66,138-143` | ok |
| email-notifications.md | only new-conversation template | `config/email.php` also `agent-new-message`, `agent-assigned` | missing-doc |

## loyalty-points
| page | docs claim | code evidence | action |
|---|---|---|---|
| configuration/installation/troubleshooting | settings at **Settings > Loyalty Points** | no PanelSection (`LoyaltyPointsServiceProvider.php:134`); menu Loyalty Points > Settings | fixed |
| usage-guide/troubleshooting | **Loyalty Points > Customer Points** menu | menu items: Reports, Members, Member Levels, Settings, License Activation (`:146-217`) | fixed → Members |
| installation.md | sub-menus Customer Points, Transactions, Member Levels, Reports | same | fixed |
| usage-guide.md | **Loyalty Points > Transactions** menu | no menu; via Members row action "Points History" (`MembersTable.php:61-65`) | fixed |
| usage-guide.md | 6 transaction types incl. Expired, Bonus | 4 types earn/redeem/adjust/reverse (`PointTransaction.php:38-59`); expiry = reverse, bonus = earn (`LoyaltyPointService.php:286-320`) | fixed |
| configuration.md | permissions `loyalty-points.adjust`, `.transactions`, `.member-levels.*` | `config/permissions.php`: `members.index`, `members.adjust`, `levels.*`, plus create/edit/destroy | fixed |
| configuration.md | "Points Exchange Rate" under General as separate setting | only earning rate + redemption rate exist (`LoyaltySettingForm.php:69,193`) — duplicates Redemption Rate | needs decision (minor) |
| releases.md | latest 1.0.0 | plugin 1.0.20 | needs decision |

## pos-pro
| page | docs claim | code evidence | action |
|---|---|---|---|
| configuration.md / faq.md / usage-guide.md | Receipt Footer Text setting | no such field in `PosProSettingForm.php` / views | fixed (removed) |
| usage-refunds.md | **POS > Refunds** menu | no menu; refund routes are POS-screen ajax (`routes/web.php:74`) | fixed (removed line) |
| usage-cash-register/usage-reports | **POS > Registers** | menu label "Register History" (`lang/en/pos.php:440`) | fixed |
| installation.md | **POS > License** | "License Activation" | fixed |
| usage-stripe-terminal.md | webhook `https://yourdomain.com/pos/stripe/terminal/webhook`; 2 events | route `stripe/terminal/webhook` no prefix (`routes/web.php:126`); controller handles also `payment_intent.succeeded/payment_failed` | fixed |
| usage-cash-register.md | **POS > Register** (open/close) | no such menu item; register is opened inside POS screen | needs decision |
| releases.md | latest 1.0.1 | plugin 1.2.21 | needs decision |

## product-gifts
| page | docs claim | code evidence | action |
|---|---|---|---|
| configuration.md | 4 styles | `GiftStyleEnum` also `playful` | fixed (row added) |
| configuration.md | no vendor / max gifts settings | `ProductGiftSettingForm.php:51-90` Enable for Vendors (marketplace only), Maximum Gifts Per Order | fixed (General Settings table added) |
| configuration.md | primary #3b82f6, icons, menu path Settings > Ecommerce > Product Gifts | `ProductGiftHelper.php:11-28`, `SettingEcommercePanelSection` | ok |
| releases.md | latest 1.0.0 | plugin 1.0.7 | needs decision |

## wholesale
| page | docs claim | code evidence | action |
|---|---|---|---|
| configuration + faq, troubleshooting, usage-guide, usage/index, usage/customer-groups | "Discount Resolution Strategy" setting (Highest/Lowest/Priority) | no form field; `getDiscountResolution()` never called; `WholesalePriceService.php:128-178` always takes max discount; priority only orders groups / picks guest fallback group (`:199-201`) | fixed (rewritten as "always largest discount") |
| configuration.md | Allow Multiple Groups default Disabled | `config/general.php` default true | fixed |
| configuration.md | colors #206bc4/#059669/#dc2626 | `WholesaleHelper.php:150-200` #3b82f6/#b91c1c/#3b82f6, + savings color #166534 | fixed |
| configuration.md | Show Pricing Table default Disabled; no auto-display | `WholesaleHelper.php:135,140` both true | fixed |
| configuration.md | permission `wholesale.applications.approve` | `applications.edit`, `.destroy`, `wholesale.index` | fixed |
| releases.md | latest 1.0.0 (mentions resolution strategy) | plugin 1.0.17 | needs decision (history untouched) |

## sms-gateways
| page | docs claim | code evidence | action |
|---|---|---|---|
| ~38 places (drivers/*, integration/*, shared-hosting/*, index, config, faq, troubleshooting…) | **Admin → Settings → SMS Gateways** | no PanelSection; menu `cms-plugins-sms-gateways-settings` (`SmsGatewaysServiceProvider.php:575`) | fixed → Admin → SMS Gateways → Settings |
| commands, gdpr, delivery-logs, configuration, faq, shared-hosting/* | `sms:purge --days=90`; retention 90d in "Retention Days" field | signature `sms:purge` no options, reads `smsg_log_retention_days` default 30, no admin field (`SmsPurgeLogsCommand.php:17-21`) | fixed |
| shared-hosting/cpanel.md | schedule purge 2AM, retry 30min, `otp:cleanup` | `Supports/ScheduledTasks.php`: heartbeat 1m, retry 5m, purge daily 03:00, status-poll 15m, abandoned carts 15m; no otp:cleanup | fixed |
| installation.md | scheduler `sms:poll-status` | `sms:status-poll` | fixed |
| usage/commands.md | `sms:verify-driver … --to=` | option is `--phone=` | fixed |
| requirements.md, shared-hosting/troubleshooting.md | `queue:work --queue=sms` | jobs on `sms-gateways` queue (`DispatchSmsJob.php:55`) | fixed → `--queue=sms-gateways,default` |
| usage/permissions.md, installation.md | `sms-gateways.drivers.configure`; no custom-drivers flags | not in `config/permissions.php`; `custom-drivers.*` exist; credentials gated by `settings.edit` | fixed |
| usage/otp.md, faq.md | `smsg_otp_default_max_attempts`; per-recipient cap 5/h | key `otp_default_max_attempts`; default 10/h, 0=unlimited (`RateLimiter.php:17-19`) | fixed |
| developer/custom-driver.md | Form class w/ `HasDriverFormFields`, `route('sms-gateways.drivers.save')`, filter driver shows in settings tabs | trait + route don't exist; `DriverTabRegistry` only covers built-ins + DB custom drivers | needs decision (section rewrite) |
| developer/custom-driver.md | `smsg_subject_register` filter | not in code; subjects from `config('plugins.sms-gateways.sms-gateways.subjects')` | needs decision |
| migration.md | rollback `sms:purge --days=0` | option doesn't exist | needs decision |
| changelog.md | latest 1.0.35 | plugin 1.0.36 (`CHANGELOG.md` has entry, mentions SaaS compatibility) | needs decision |
| requirements.md | "Laravel 10 or higher (via Botble 7.3+)" | repo ships Laravel ^13 | needs decision |

## sms-gateway (singular, 7 pages)
Docs describe `FriendsOfBotble\Sms` (Twilio/Nexmo). No repo in `~/workspace` ships it (`ls -d */platform/plugins/sms*` → only sms-gateways). sms-gateways ships `sms:import-fob` to migrate from `friendsofbotble/fob-sms-gateway` → superseded. Not in .vitepress nav except `product-labels.ts:14`. **Needs decision** (not deleted).

## cloudify
| page | docs claim | code evidence | action |
|---|---|---|---|
| usage-api.md | token page `Settings -> API Tokens -> Create` | `CloudifyPanelSection.php`: Settings → Cloudify → API Keys | fixed |
| usage-api.md | endpoint table missing show/update | `routes/api.php`: GET+PATCH `/media/files/{id}`, PATCH `/media/folders/{id}` | fixed (rows added) |
| installation-requirements.md | no GD | `composer.json` ext-gd | fixed (added) |
| api-reference.md | per_page 40, rate limit 300/min env `CLOUDIFY_RATE_LIMIT_PER_MINUTE` | `MediaFileController.php:32`, `config/cloudify.php` | ok |

## desk-hive
| page | docs claim | code evidence | action |
|---|---|---|---|
| ~20 places (faq, agents, departments, customers, knowledge-base, troubleshooting, products, email-to-ticket, installation-*) | **Admin → Support Desk → Settings → X** | settings are a PanelSection (`Settings/SupportDeskPanelSection.php`): Settings → Support Desk Settings / Email Piping / Envato Integration / License Manager; no Settings item in Support Desk menu (`HookServiceProvider.php:75-191`) | fixed |
| api-overview.md | API keys in Admin > Support Desk > Settings > API Keys | created in agent portal `/support/agent/settings?section=api` (`routes/web-agent.php:126`, `AgentSettingsController.php:111`) or internal API | fixed |
| installation-web-interface.md | General settings table missing fields | `SupportDeskSettingsForm.php`: department visibility (off), ticket prefix (SD) | fixed (rows added) |
| installation-requirements.md | no GD | `composer.json` ext-gd | fixed |
| api-internal/api-external | endpoint lists | `routes/api.php` — all match | ok |
| email-to-ticket.md | `support-desk:process-emails` every 5 min | `SupportDeskServiceProvider.php:114` | ok |

## Undocumented features
- live-chat: Embed on external sites (embed enabled + allowed domains, `/api/live-chat/*` CORS API); blocked emails/phones; footer text; admin phone; auto-detect logged-in customer; agent-initiated chat / live visitors; widget sound; Team Snippets admin page; Reports page; commands `live-chat:presence:evict`, `live-chat:conversations:prune-empty`, `live-chat:geoip:instructions`; email templates agent-new-message / agent-assigned
- loyalty-points: loyalty card (PDF download), guest checkout Member ID, product info box + style options, customer page slug, email notifications section, public member page `/{slug}/member/{token}`, command `loyalty:recalculate {--order_id=}`
- pos-pro: commands `pos-pro:demo`, `pos:test-local-device`; refund methods original_tender/store_credit (enum)
- sms-gateways: presets Alpha SMS, MimSMS (only SSL Wireless, BulkSMSDhaka documented); plugin.json description says "7 providers" but 8 native drivers ship (incl. eSMS.vn) — code-side text
- cloudify: API Settings page (domain/IP blacklists, auto-blacklist after N failures, rate-limit method IP/token, requests per hour); API key "Restrict to folders"; Google Cloud Storage adapter
- desk-hive: theme option "Announcement bar" section (badge, message, discount code, countdown, button) missing from theme-customization.md

## Needs decision
1. live-chat installation.md seed command references non-existent class — remove section or point to demo-only seeder?
2. Releases pages stale: loyalty-points (1.0.0 vs 1.0.20), pos-pro (1.0.1 vs 1.2.21), product-gifts (1.0.0 vs 1.0.7), wholesale (1.0.0 vs 1.0.17), sms-gateways changelog (1.0.35 vs 1.0.36). Run `bb:changelog` / add entries?
3. sms-gateways 1.0.36 entry mentions "Botble Ecommerce SaaS" — OK to publish?
4. sms-gateways developer/custom-driver.md: Form class section + `smsg_subject_register` filter section describe non-existent APIs; needs rewrite by plugin owner.
5. sms-gateways migration.md rollback step `sms:purge --days=0` invalid — replace with manual truncate?
6. sms-gateways requirements.md "Laravel 10 or higher" — set to what CMS 7.3+ actually requires?
7. sms-gateway (singular) 7 pages: superseded FOB plugin, no code — delete/redirect to sms-gateways or keep as legacy?
8. pos-pro "POS > Register" for opening/closing register — real UI path inside POS screen unknown.
9. loyalty-points "Points Exchange Rate" (General) duplicates Redemption Rate — remove?
10. cloudify composer allows only PHP ^8.3|^8.4 (no 8.5) unlike other products — docs say 8.3.0+ (fine), but code may want ^8.5 added.

## Unresolved questions
- Is the Live Chat demo seeder shipped in the CodeCanyon package?
- Wholesale `WHOLESALE_DISCOUNT_RESOLUTION` env/config exists but unused — intended feature (bug) or dead code? Docs now describe actual behavior (always largest).
- sms-gateways rate-limit settings show 0 in form but runtime defaults 10/60 until saved — intended?
