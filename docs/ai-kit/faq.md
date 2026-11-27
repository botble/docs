---
title: FAQ
description: Frequently asked questions about the Botble AI Kit - supported assistants, privacy, Regular vs Team licences, client projects, updates, refunds and support.
---

# FAQ

## General

### Which AI assistants does it work with?
**Claude Code**, **Codex** and **Gemini / Antigravity**. The zip contains a separate folder for each one. See [Installation](./installation.md).

### Which Botble versions are supported?
Botble CMS 7.x. That includes products built on Botble, such as Shofy, Martfury, Homzen and the other Botble themes.

### Do I still need to know PHP?
Yes, enough to read a diff and test the result. The kit makes the assistant follow Botble's conventions and check its own work, but you are still the one who approves and ships the change.

### Does the kit make the AI perfect?
No. It removes most of the guessing that leads to code that runs but does not fit Botble, and it makes the assistant verify its work with `php -l`, Pint, the Blade linter, PHPUnit and asset builds. AI assistants still make mistakes, so review changes before you ship them.

## Privacy

### Does the kit send my code anywhere?
No. The kit is instructions and scripts that run on your machine. It has no server, no telemetry and no account. Your assistant talks to its own AI provider exactly as it would without the kit.

### Does it need internet access?
The kit itself does not. Your assistant does, as usual. The optional translation scripts call an online translation service through `deep-translator` when you run them.

## Licences

### What is the difference between Regular and Team?
- **Regular**: one developer, on any number of their own machines.
- **Team**: up to five named developers in one company.

Both are a one-time payment and include 12 months of updates. When the update period ends you keep using the version you have; nothing stops working.

### Can I use it on client projects?
Yes. You can use the kit for any number of projects, personal or for clients, and the code it helps you produce is yours to use without restriction, including in products you sell.

### Can I share the kit or include it in my own product?
No. You may not share, resell, publish or redistribute the kit or any part of it, modified or not. That includes public or shared repositories, prompt libraries, courses and other AI skill packs. You may modify the kit for your own use. The full terms are in `LICENSE.md` inside the package.

## Updates

### How do I get updates?
Download the new zip from your account on [marketplace.botble.com](https://marketplace.botble.com), or, if you use the private GitHub repository `botble/ai-kit`, pull the latest version. Then follow the **Updating** steps for your assistant in [Installation](./installation.md).

### How do I get access to the GitHub repository?
Your receipt email has a link to your access page. Add your GitHub username there (one per developer; Team has 5 seats) and GitHub invites you to the private repository `botble/ai-kit` right away. Accept the invitation (it expires after 7 days; the same page sends a new one), then install from the repository as described in [Installation](./installation.md#install-from-github-instead).

### What changed in each version?
See the [Changelog](./changelog.md).

## Buying and support

### Where can I buy it?
On the [Botble AI Kit page](https://marketplace.botble.com/ai-kit).

### Can I get a refund?
Refunds follow our [refund policy](https://marketplace.botble.com/refund-policy).

### Where do I get help?
Contact us through [botble.com/contact](https://botble.com/contact). Include your order email, which assistant you use, and the exact error or what you expected to happen.
