export type CmsFieldType = 'text' | 'textarea' | 'image' | 'list' | 'cards';

export type CmsField = {
  key: string;
  label: string;
  type: CmsFieldType;
  help?: string;
};

export type CmsSection = {
  key: string;
  label: string;
  fields: CmsField[];
};

export type CmsPageConfig = {
  slug: string;
  title: string;
  sections: CmsSection[];
  defaults: Record<string, unknown>;
};

export const pageConfigs: CmsPageConfig[] = [
  {
    slug: 'home',
    title: 'Home page',
    sections: [
      {
        key: 'hero',
        label: 'Hero section',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'title', label: 'Main title', type: 'textarea' },
          { key: 'copy', label: 'Description', type: 'textarea' },
          { key: 'image', label: 'Hero image URL', type: 'image' },
          { key: 'badges', label: 'Badges', type: 'list', help: 'One badge per line' },
          { key: 'locations', label: 'Location strip', type: 'list', help: 'One location per line' },
        ],
      },
      {
        key: 'intro',
        label: 'Short profile',
        fields: [
          { key: 'label', label: 'Section label', type: 'text' },
          { key: 'title', label: 'Section title', type: 'textarea' },
          { key: 'copy', label: 'Section copy', type: 'textarea' },
        ],
      },
      {
        key: 'consultation',
        label: 'Consultation block',
        fields: [
          { key: 'label', label: 'Section label', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
          { key: 'copy', label: 'Copy', type: 'textarea' },
          { key: 'image', label: 'Image URL', type: 'image' },
          { key: 'items', label: 'Consultation cards', type: 'cards', help: 'Format: Title | Description' },
        ],
      },
      {
        key: 'services',
        label: 'Services strip',
        fields: [
          { key: 'label', label: 'Section label', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'items', label: 'Service items', type: 'list', help: 'One service per line' },
        ],
      },
      {
        key: 'showcase',
        label: 'Portfolio glimpse',
        fields: [
          { key: 'label', label: 'Section label', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
          { key: 'copy', label: 'Copy', type: 'textarea' },
          { key: 'images', label: 'Gallery images', type: 'list', help: 'One image URL per line' },
        ],
      },
      {
        key: 'why',
        label: 'Why choose KTL',
        fields: [
          { key: 'label', label: 'Section label', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
          { key: 'items', label: 'Reasons', type: 'list', help: 'One reason per line' },
        ],
      },
      {
        key: 'cta',
        label: 'Final CTA',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
          { key: 'copy', label: 'Copy', type: 'textarea' },
          { key: 'image', label: 'Image URL', type: 'image' },
        ],
      },
    ],
    defaults: {
      hero: {
        eyebrow: 'Interior contracting | Workspace delivery',
        title: 'KTL Interiors transforms offices with excellence',
        copy: 'KTL Interiors designs and delivers modern office, coworking, healthcare, residential, and commercial interiors with disciplined execution from concept to completion.',
        image: '/profile-images/profile_page_01_image_01_xref_304.jpeg',
        badges: ['Turnkey contracting', 'CAD planning', 'MEP coordination'],
        locations: ['Kochi', 'Kozhikode', 'Kannur', 'Bengaluru', 'Hyderabad'],
      },
      intro: {
        label: 'Short profile',
        title: 'Functional spaces, clean aesthetics, and ergonomic planning for teams that need to move fast.',
        copy: 'KTL Interiors is a multidisciplinary interior contracting firm with proven expertise in delivering high-performing spaces. The team combines space planning, finish selection, site coordination, and project management so each workspace reflects the client brand and supports everyday productivity.',
      },
      consultation: {
        label: 'Interior consultation',
        title: 'Book a design discussion before you spend on site.',
        copy: 'KTL helps clients make the big decisions first: space efficiency, furniture systems, finish quality, lighting, services, and phasing.',
        image: '/profile-images/profile_page_04_image_01_xref_347.jpeg',
        items: [
          { title: 'Workspace Audit', text: 'We study team size, departments, movement, storage, visitor areas, and expansion needs.' },
          { title: 'Look & Feel Direction', text: 'Material palettes, lighting tone, furniture mood, and brand cues are aligned early.' },
          { title: 'Budget & Timeline Scope', text: 'You get a practical execution path before committing to the full fit-out.' },
          { title: 'Turnkey Site Plan', text: 'Interior, furniture, MEP, modular installations, and handover are coordinated together.' },
        ],
      },
      services: {
        label: 'What we do',
        title: 'Turnkey interior delivery',
        items: [
          'Office interior design and turnkey contracting',
          'Furniture, partitions, and modular installations',
          'Lighting, electrical, HVAC, and technology integration',
          'Space planning and customised CAD layouts',
          'Renovations, refurbishments, and custom fit-outs',
        ],
      },
      showcase: {
        label: 'Portfolio glimpse',
        title: 'Real extracted project visuals from the KTL profile.',
        copy: 'A compact look at office workstations, collaborative zones, executive finishes, and fit-out details from the company profile assets.',
        images: [
          '/profile-images/profile_page_02_image_01_xref_316.jpeg',
          '/profile-images/profile_page_05_image_02_xref_353.jpeg',
          '/profile-images/profile_page_06_image_02_xref_29.jpeg',
          '/profile-images/profile_page_08_image_01_xref_42.jpeg',
          '/profile-images/profile_page_10_image_01_xref_53.jpeg',
          '/profile-images/profile_page_12_image_01_xref_64.jpeg',
        ],
      },
      why: {
        label: 'Why choose KTL',
        title: 'Built for clarity on site and confidence at handover.',
        items: [
          'Experienced project management',
          'Budget friendly space optimisation',
          'Quality craftsmanship',
          'Deadline-led execution',
          'Transparent communication',
          'Trusted by corporate, startup, and coworking clients',
        ],
      },
      cta: {
        eyebrow: 'Free consultation',
        title: 'Ready to elevate your workspace?',
        copy: 'Contact KTL Interiors and discover how general contracting expertise can bring your vision to life.',
        image: '/profile-images/profile_page_13_image_01_xref_72.jpeg',
      },
    },
  },
  {
    slug: 'about',
    title: 'About page',
    sections: [
      {
        key: 'header',
        label: 'Page header',
        fields: [
          { key: 'kicker', label: 'Kicker', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
        ],
      },
      {
        key: 'story',
        label: 'Story copy',
        fields: [
          { key: 'paragraphs', label: 'Paragraphs', type: 'list', help: 'One paragraph per line' },
        ],
      },
      {
        key: 'images',
        label: 'Image grid',
        fields: [
          { key: 'items', label: 'Images', type: 'list', help: 'One image URL per line' },
        ],
      },
    ],
    defaults: {
      header: {
        kicker: 'About KTL Interiors',
        title: 'Multidisciplinary interior contracting for high-performing spaces.',
      },
      story: {
        paragraphs: [
          'KTL Interiors delivers functional, aesthetic, and future-ready spaces across offices, coworking hubs, healthcare facilities, luxury villas, and large-scale commercial buildings.',
          'The studio blends thoughtful planning, clean aesthetics, ergonomic detailing, and site-level execution. From concept to completion, the focus stays on quality, efficiency, and design integrity.',
          'Every project is shaped to reflect the client brand while supporting collaboration, productivity, comfort, and the evolving needs of modern professionals.',
        ],
      },
      images: {
        items: [
          '/profile-images/profile_page_04_image_01_xref_347.jpeg',
          '/profile-images/profile_page_05_image_03_xref_354.jpeg',
          '/profile-images/profile_page_03_image_04_xref_335.jpeg',
        ],
      },
    },
  },
  {
    slug: 'services',
    title: 'Services page',
    sections: [
      {
        key: 'header',
        label: 'Page header',
        fields: [
          { key: 'kicker', label: 'Kicker', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
        ],
      },
      {
        key: 'services',
        label: 'Service cards',
        fields: [
          { key: 'items', label: 'Service cards', type: 'cards', help: 'Format: Title | Description | Image URL' },
        ],
      },
    ],
    defaults: {
      header: {
        kicker: 'Our services',
        title: 'One team for design intent, site execution, and final handover.',
      },
      services: {
        items: [
          { title: 'Complete Office Interiors', text: 'Office interior designing and turnkey contracting from concept, planning, material coordination, and execution through handover.', image: '/profile-images/profile_page_03_image_01_xref_332.jpeg' },
          { title: 'Furniture & Modular Systems', text: 'Furniture, partitions, and modular installations designed for flexible, efficient, and brand-aligned workplaces.', image: '/profile-images/profile_page_03_image_02_xref_333.jpeg' },
          { title: 'MEP & Technology Integration', text: 'Lighting, electrical, HVAC, and technology integration coordinated into one clean interior delivery process.', image: '/profile-images/profile_page_03_image_04_xref_335.jpeg' },
          { title: 'Space Planning & CAD Layouts', text: 'Customised CAD layouts and ergonomic space planning that optimise circulation, collaboration, and resource use.', image: '/profile-images/profile_page_03_image_03_xref_334.jpeg' },
          { title: 'Renovation & Custom Fit-Outs', text: 'Renovations, refurbishments, and custom fit-outs for offices, coworking spaces, commercial buildings, and premium residences.', image: '/profile-images/profile_page_03_image_05_xref_336.png' },
        ],
      },
    },
  },
  {
    slug: 'portfolio',
    title: 'Portfolio page',
    sections: [
      {
        key: 'header',
        label: 'Page header',
        fields: [
          { key: 'kicker', label: 'Kicker', type: 'text' },
          { key: 'title', label: 'Title', type: 'textarea' },
        ],
      },
    ],
    defaults: {
      header: {
        kicker: 'Portfolio',
        title: 'Extracted visuals from the KTL company profile.',
      },
    },
  },
  {
    slug: 'contact',
    title: 'Contact page',
    sections: [
      {
        key: 'header',
        label: 'Page header',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'text' },
        ],
      },
      {
        key: 'details',
        label: 'Contact details',
        fields: [
          { key: 'title', label: 'Left column title', type: 'text' },
          { key: 'blocks', label: 'Info blocks', type: 'cards', help: 'Format: Heading | Line one / Line two / Line three' },
        ],
      },
      {
        key: 'form',
        label: 'Form labels',
        fields: [
          { key: 'namePlaceholder', label: 'Name placeholder', type: 'text' },
          { key: 'emailPlaceholder', label: 'Email placeholder', type: 'text' },
          { key: 'phonePlaceholder', label: 'Phone placeholder', type: 'text' },
          { key: 'messagePlaceholder', label: 'Message placeholder', type: 'textarea' },
          { key: 'button', label: 'Button text', type: 'text' },
        ],
      },
    ],
    defaults: {
      header: {
        title: 'Contact Us',
        subtitle: 'Let us connect and build something great',
      },
      details: {
        title: 'Get in Touch',
        blocks: [
          { title: 'Head Office', text: '3rd Floor Royal Oak Mall, TK Junction / Kannur, Kerala 670002' },
          { title: 'Branch Office', text: '#1282, 2nd Floor, 16th Cross / Hongasandra, 7th Main Rd, Begur / Bengaluru, Karnataka-560114' },
          { title: 'Contact Details', text: 'Email: office@ktlcoworks.com / Phone: +91 9746 241 399' },
          { title: 'Our Locations', text: 'Kochi | Kozhikode | Kannur | Bengaluru | Hyderabad' },
        ],
      },
      form: {
        namePlaceholder: 'Your Name',
        emailPlaceholder: 'Your Email',
        phonePlaceholder: 'Your Phone Number',
        messagePlaceholder: 'Tell us about your project...',
        button: 'Send Message',
      },
    },
  },
];

export function getPageConfig(slug: string) {
  return pageConfigs.find((page) => page.slug === slug) || pageConfigs[0];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function mergeCmsContent(
  defaults: Record<string, unknown>,
  content: unknown
): Record<string, unknown> {
  if (!isRecord(content)) return defaults;

  const merged: Record<string, unknown> = { ...defaults };

  for (const [sectionKey, sectionValue] of Object.entries(content)) {
    if (isRecord(defaults[sectionKey]) && isRecord(sectionValue)) {
      merged[sectionKey] = { ...(defaults[sectionKey] as Record<string, unknown>), ...sectionValue };
    } else {
      merged[sectionKey] = sectionValue;
    }
  }

  return merged;
}
