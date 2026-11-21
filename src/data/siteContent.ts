export const SITE = {
  founderName: 'Deepak Agarwal',
  founderFirstName: 'Deepak',
  businessName: 'MoneyBack Board',
  whoIHelpPlaceholder: '[who you help]',
  kindOfBusinessPlaceholder: '[kind of business]',
  city: 'Surat',
  promiseBeforeAccent: 'Every',
  promiseAccentWord: 'unpaid',
  promiseAfterAccent: 'order, back on your board',
  whatISetUpLead:
    'I set up one short form that flags big unpaid orders the same day, and one board that shows the money still owed.',
  price: 'Rs 15,000 setup + Rs 5,000 a month',
  bookingUrl: 'https://cal.com/deepak-agarwal-rooc7e/20-minute-intro-call',
  email: 'dpakagarwal737@gmail.com',
  year: new Date().getFullYear(),
} as const;

export interface WorkItem {
  number: string;
  title: string;
  image: string;
  imageAlt: string;
  today: string;
  withBoard: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    number: '01',
    title: 'One short form',
    image: '/work-1.jpg',
    imageAlt: 'Desk setup with notebook, phone, laptop, and follow-up cards',
    today: 'Unpaid orders are jotted in notebooks or buried inside everyday messages.',
    withBoard: 'Your team fills one short form whenever an order leaves unpaid.',
  },
  {
    number: '02',
    title: 'Same-day flag for big unpaid orders',
    image: '/work-2.jpg',
    imageAlt: 'Close-up of an unpaid order card highlighted in saffron marigold',
    today: 'Big unpaid orders sit quiet until days later when it feels awkward to chase.',
    withBoard: 'Big unpaid orders are flagged the same day so you catch them early.',
  },
  {
    number: '03',
    title: 'One board of money owed',
    image: '/work-3.jpg',
    imageAlt: 'MoneyBack Board tracking unpaid orders and follow-ups above packed parcels',
    today: 'Nobody can look in one place and see every unpaid order still open.',
    withBoard: 'One MoneyBack Board shows every unpaid order and the money still owed.',
  },
];

export const WITHOUT_LINES: string[] = [
  'You close the shop wondering which orders from this week are still unpaid.',
  'You scroll through old messages and check paper notes before heading home.',
  'Big unpaid orders slip past because nobody flagged them the same day.',
  'Follow-ups wait for tomorrow because there is no single list to look at.',
];

export const WITH_LINES: string[] = [
  'Every unpaid order from the day is already logged on one short form.',
  'Any big unpaid order is flagged the same day so you see it right away.',
  'You look at one board and see the money still owed to your store.',
  'You head home knowing what is open and who needs a follow-up.',
];

export interface StartStep {
  number: string;
  title: string;
  description: string;
}

export const START_STEPS: StartStep[] = [
  {
    number: '01',
    title: 'A 20-minute call',
    description:
      'We talk through how unpaid orders happen in your store and what you want visible on your board.',
  },
  {
    number: '02',
    title: 'A plan for your [kind of business]',
    description:
      'I map out the short form, what counts as a big unpaid order to flag the same day, and your board layout.',
  },
  {
    number: '03',
    title: 'I set it up and show your team',
    description:
      'I put the form and MoneyBack Board in place, walk your team through using them, and keep them working each month.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Who is MoneyBack Board for?',
    answer:
      'It is built for [who you help] in Surat who want every unpaid order tracked on one board instead of scattered notes.',
  },
  {
    question: 'What exactly do you set up?',
    answer:
      'I set up one short form that flags big unpaid orders the same day, and one board that shows the money still owed.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'We agree on the timeline together during our 20-minute call, based on how your store runs.',
  },
  {
    question: 'What does it cost?',
    answer: 'Rs 15,000 setup + Rs 5,000 a month.',
  },
  {
    question: 'How do we start?',
    answer:
      'Book a 20-minute call with any booking button on this page, or write to dpakagarwal737@gmail.com.',
  },
];
