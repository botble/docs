import { defineConfig } from 'vitepress'
import cmsSidebar from '../cms/sidebar'
import hasaSidebar from '../hasa/sidebar'
import flexHomeSidebar from '../flex-home/sidebar'
import laraMagSidebar from '../lara-mag/sidebar'
import jobcySidebar from '../jobcy/sidebar'
import mirandaSidebar from '../miranda/sidebar'
import shopwiseSidebar from '../shopwise/sidebar'
import storiesSidebar from '../stories/sidebar'
import wowySidebar from '../wowy/sidebar'
import farmartSidebar from '../farmart/sidebar'
import martfurySidebar from '../martfury/sidebar'
import nestSidebar from '../nest/sidebar'
import jobzillaSidebar from '../jobzilla/sidebar'
import transpSidebar from '../transp/sidebar'
import ninicoSidebar from '../ninico/sidebar'
import gerowSidebar from '../gerow/sidebar'
import shofySidebar from '../shofy/sidebar'
import athenaSidebar from '../athena/sidebar'
import cloudifySidebar from '../cloudify/sidebar'
import homzenSidebar from '../homzen/sidebar'
import smsGatewaySidebar from '../sms-gateway/sidebar'
import zelioSidebar from '../zelio/sidebar'
import carentoSidebar from '../carento/sidebar'
import infiniaSidebar from '../infinia/sidebar'
import posProSidebar from '../pos-pro/sidebar'
import affiliateProSidebar from '../affiliate-pro/sidebar'
import martfuryFlutterSidebar from '../martfury-flutter/sidebar'
import restoriaSidebar from '../restoria/sidebar'

export default defineConfig({
  title: 'Botble Documentation',
  description: "Documentation for all Botble's products",
  head: [
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '57x57', 'href': '/favicon/apple-icon-57x57.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '60x60', 'href': '/favicon/apple-icon-60x60.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '72x72', 'href': '/favicon/apple-icon-72x72.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '76x76', 'href': '/favicon/apple-icon-76x76.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '114x114', 'href': '/favicon/apple-icon-114x114.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '120x120', 'href': '/favicon/apple-icon-120x120.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '144x144', 'href': '/favicon/apple-icon-144x144.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '152x152', 'href': '/favicon/apple-icon-152x152.png' }],
    ['link', { 'rel': 'apple-touch-icon', 'sizes': '180x180', 'href': '/favicon/apple-icon-180x180.png' }],
    ['link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '192x192', 'href': '/favicon/android-icon-192x192.png' }],
    ['link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '32x32', 'href': '/favicon/favicon-32x32.png' }],
    ['link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '96x96', 'href': '/favicon/favicon-96x96.png' }],
    ['link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '16x16', 'href': '/favicon/favicon-16x16.png' }],
    ['link', { 'rel': 'manifest', 'href': '/favicon/manifest.json' }],
    ['meta', { 'name': 'msapplication-TileColor', 'content': '#ffffff' }],
    ['meta', { 'name': 'msapplication-TileImage', 'content': '/favicon/ms-icon-144x144.png' }],
    ['meta', { 'name': 'theme-color', 'content': '#ffffff' }],
  ],
  lastUpdated: true,
  themeConfig: {
    logo: 'logo.png',
    siteTitle: false,
    editLink: {
      pattern: ({ relativePath }) => {
        const [project, fileName] = relativePath.split('/')

        return `https://github.com/botble/${project}-docs/edit/master/${fileName}`
      },
    },

    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: [
          { text: 'Botble', link: '/cms/' },
          { text: 'HASA', link: '/hasa/' },
          { text: 'Flex Home', link: '/flex-home/' },
          { text: 'LaraMag', link: '/lara-mag/' },
          { text: 'Miranda', link: '/miranda/' },
          { text: 'Shopwise', link: '/shopwise/' },
          { text: 'Martfury', link: '/martfury/' },
          { text: 'Martfury Flutter', link: '/martfury-flutter/' },
          { text: 'Stories', link: '/stories/' },
          { text: 'Wowy', link: '/wowy/' },
          { text: 'Nest', link: '/nest/' },
          { text: 'Farmart', link: '/farmart/' },
          { text: 'Jobcy', link: '/jobcy/' },
          { text: 'jobzilla', link: '/jobzilla/' },
          { text: 'Transp', link: '/transp/' },
          { text: 'Ninico', link: '/ninico/' },
          { text: 'Gerow', link: '/gerow/' },
          { text: 'Shofy', link: '/shofy/'},
          { text: 'Athena', link: '/athena/'},
          { text: 'Cloudify', link: '/cloudify/'},
          { text: 'Homzen', link: '/homzen/'},
          { text: 'SMS Gateway', link: '/sms-gateway/'},
          { text: 'Zelio', link: '/zelio/'},
          { text: 'Carento', link: '/carento/'},
          { text: 'Infinia', link: '/infinia/'},
          { text: 'POS Pro', link: '/pos-pro/'},
          { text: 'Affiliate Pro', link: '/affiliate-pro/'},
          { text: 'Restoria', link: '/restoria/'},
        ],
      },
      { text: 'Support', link: 'https://botble.ticksy.com' },
      {
        text: 'Our Products',
        link: 'https://codecanyon.net/user/botble/portfolio',
      },
      { text: 'Contact', link: 'https://botble.com/contact' },
    ],

    sidebar: {
      cms: cmsSidebar,
      hasa: hasaSidebar,
      'flex-home': flexHomeSidebar,
      'lara-mag': laraMagSidebar,
      jobcy: jobcySidebar,
      miranda: mirandaSidebar,
      shopwise: shopwiseSidebar,
      stories: storiesSidebar,
      wowy: wowySidebar,
      farmart: farmartSidebar,
      'martfury-flutter': martfuryFlutterSidebar,
      martfury: martfurySidebar,
      nest: nestSidebar,
      jobzilla: jobzillaSidebar,
      transp: transpSidebar,
      ninico: ninicoSidebar,
      gerow: gerowSidebar,
      shofy: shofySidebar,
      athena: athenaSidebar,
      cloudify: cloudifySidebar,
      homzen: homzenSidebar,
      'sms-gateway': smsGatewaySidebar,
      zelio: zelioSidebar,
      carento: carentoSidebar,
      infinia: infiniaSidebar,
      'pos-pro': posProSidebar,
      'affiliate-pro': affiliateProSidebar,
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/botble' }],

    footer: {
      copyright: `Built with Laravel and developed by Botble Technologies © ${new Date().getFullYear()}.`,
    },
  },
})
