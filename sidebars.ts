import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{ type: "autogenerated", dirName: "." }],

  // But you can create a sidebar manually
  docs: [
    "intro",
    "change-log",
    "reference",
    {
      type: "category",
      label: "Quickstart",
      items: ["quick-start/overview-of-apps", "quick-start/getting-started"],
    },
    {
      type: "category",
      label: "Interactions",
      items: [
        "interactions/overview",
        "interactions/receiving-and-responding",
        "interactions/application-commands",
        "interactions/message-components",
      ],
    },
    {
      type: "category",
      label: "Resources",
      items: [
        "resources/application",
        "resources/application-role-connection-metadata",
        "resources/audit-log",
        "resources/auto-moderation",
        "resources/channel",
        "resources/emoji",
        "resources/guild",
        "resources/guild-scheduled-event",
        "resources/guild-template",
        "resources/invite",
        "resources/poll",
        "resources/stage-instance",
        "resources/sticker",
        "resources/user",
        "resources/voice",
        "resources/webhook",
      ],
    },
    {
      type: "category",
      label: "Topics",
      items: [
        "topics/certified-devices",
        "topics/community-resources",
        "topics/gateway",
        "topics/gateway-events",
        "topics/oauth2",
        "topics/opcodes-and-status-codes",
        "topics/permissions",
        "topics/rpc",
        "topics/rate-limits",
        "topics/teams",
        "topics/threads",
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        "tutorials/configuring-app-metadata-for-linked-roles",
        "tutorials/developing-a-user-installable-app",
        "tutorials/hosting-on-cloudflare-workers",
        "tutorials/upgrading-to-application-commands",
      ],
    },
    {
      type: "category",
      label: "Best Practices",
      items: ["best-practices/crafting-your-app-directory-product-page"],
    },
    {
      type: "category",
      label: "Monetization",
      items: [
        "monetization/overview",
        "monetization/app-subscriptions",
        "monetization/one-time-purchases",
        "monetization/managing-your-store",
        "monetization/skus",
        "monetization/entitlements",
      ],
    },
    {
      type: "category",
      label: "Activities",
      items: [
        "activities/overview",
        "activities/how-activities-work",
        "activities/building-an-activity",
        "activities/development-guides",
        "activities/design-patterns",
      ],
    },
    {
      type: "category",
      label: "Developer Tools",
      items: ["developer-tools/embedded-app-sdk"],
    },
    {
      type: "category",
      label: "Rich Presence",
      items: [
        "rich-presence/how-to",
        "rich-presence/best-practices",
        "rich-presence/launch-checklist",
        "rich-presence/faq",
      ],
    },
    {
      type: "category",
      label: "Game SDK",
      items: [
        "game-sdk/getting-started",
        "game-sdk/discord",
        "game-sdk/achievements",
        "game-sdk/activities",
        "game-sdk/applications",
        "game-sdk/discord-voice",
        "game-sdk/images",
        "game-sdk/lobbies",
        "game-sdk/networking",
        "game-sdk/overlay",
        "game-sdk/relationships",
        "game-sdk/storage",
        "game-sdk/store",
        "game-sdk/users",
      ],
    },
    {
      type: "category",
      label: "Policies and Agreements",
      items: [
        "policies-and-agreements/developer-policy",
        "policies-and-agreements/developer-terms-of-service",
        "policies-and-agreements/monetization-policy",
      ],
    },
  ],
};

export default sidebars;
