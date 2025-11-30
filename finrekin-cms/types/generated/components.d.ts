import type { Schema, Struct } from '@strapi/strapi';

export interface AreasAreaList extends Struct.ComponentSchema {
  collectionName: 'components_areas_area_lists';
  info: {
    displayName: 'Area List';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface FormsForm extends Struct.ComponentSchema {
  collectionName: 'components_forms_forms';
  info: {
    displayName: 'Form';
    icon: 'message';
  };
  attributes: {
    button: Schema.Attribute.String;
    long_field: Schema.Attribute.String;
    short_field: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ItemList extends Struct.ComponentSchema {
  collectionName: 'components_item_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    button: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    selected: Schema.Attribute.Boolean;
    title: Schema.Attribute.Text;
  };
}

export interface ItemPriceList extends Struct.ComponentSchema {
  collectionName: 'components_item_price_lists';
  info: {
    displayName: 'Price list';
    icon: 'priceTag';
  };
  attributes: {
    service_description: Schema.Attribute.RichText;
    service_name: Schema.Attribute.String;
    service_title: Schema.Attribute.String;
  };
}

export interface ItemShortText extends Struct.ComponentSchema {
  collectionName: 'components_item_short_texts';
  info: {
    displayName: 'Short text';
    icon: 'quote';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface ItemSimpleText extends Struct.ComponentSchema {
  collectionName: 'components_item_simple_texts';
  info: {
    displayName: 'Simple text';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ItemSocialsList extends Struct.ComponentSchema {
  collectionName: 'components_item_socials_lists';
  info: {
    displayName: 'Socials list';
    icon: 'paperPlane';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_footers';
  info: {
    displayName: 'Footer';
    icon: 'arrowDown';
  };
  attributes: {
    city: Schema.Attribute.String;
    company: Schema.Attribute.String;
    kapital: Schema.Attribute.String;
    nip: Schema.Attribute.String;
    polityka: Schema.Attribute.String;
    prawa: Schema.Attribute.String;
    regon: Schema.Attribute.String;
    street: Schema.Attribute.String;
  };
}

export interface SectionsHeader extends Struct.ComponentSchema {
  collectionName: 'components_sections_headers';
  info: {
    displayName: 'Header';
    icon: 'stack';
  };
  attributes: {
    address: Schema.Attribute.String;
    address_comment: Schema.Attribute.String;
    instagram_link: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    menu: Schema.Attribute.Component<'item.simple-text', true>;
    phone: Schema.Attribute.String;
    phone_comment: Schema.Attribute.String;
    telegram_link: Schema.Attribute.String;
  };
}

export interface SectionsSectionAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_abouts';
  info: {
    displayName: 'Section About';
    icon: 'information';
  };
  attributes: {
    description: Schema.Attribute.Text;
    mainTitle: Schema.Attribute.String;
    title: Schema.Attribute.RichText;
    workers: Schema.Attribute.Component<'workers.workers-list', true>;
  };
}

export interface SectionsSectionArea extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_areas';
  info: {
    displayName: 'Section Area';
    icon: 'apps';
  };
  attributes: {
    additionalText: Schema.Attribute.Text;
    areas: Schema.Attribute.Component<'areas.area-list', true>;
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsSectionBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_banners';
  info: {
    displayName: 'Section Banner';
    icon: 'server';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSectionContact extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_contacts';
  info: {
    displayName: 'Section Contact';
    icon: 'envelop';
  };
  attributes: {
    addres: Schema.Attribute.String;
    form_settings: Schema.Attribute.Component<'forms.form', false>;
    instagram_link: Schema.Attribute.String;
    mail: Schema.Attribute.String;
    mainTitle: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    telegram_link: Schema.Attribute.String;
  };
}

export interface SectionsSectionFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_faqs';
  info: {
    displayName: 'Section FAQ';
    icon: 'question';
  };
  attributes: {
    mainTitle: Schema.Attribute.String;
    questions: Schema.Attribute.Component<'item.simple-text', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSectionForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_forms';
  info: {
    displayName: 'Section Form';
    icon: 'message';
  };
  attributes: {
    description: Schema.Attribute.Text;
    form_settings: Schema.Attribute.Component<'forms.form', false>;
    instagram_link: Schema.Attribute.String;
    mainTitle: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    telegram_link: Schema.Attribute.String;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsSectionHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_heroes';
  info: {
    displayName: 'Section Hero';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    title: Schema.Attribute.RichText;
    uslugi: Schema.Attribute.Component<'item.list', true>;
  };
}

export interface SectionsSectionOffers extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_offers';
  info: {
    displayName: 'Section Offers';
    icon: 'briefcase';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    oferty: Schema.Attribute.Component<'item.list', true>;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsSectionOpinion extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_opinions';
  info: {
    displayName: 'Section Opinion';
    icon: 'star';
  };
  attributes: {
    mainTitle: Schema.Attribute.String;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsSectionPrice extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_prices';
  info: {
    displayName: 'Section Price';
    icon: 'strikeThrough';
  };
  attributes: {
    mainTitle: Schema.Attribute.String;
    prices: Schema.Attribute.Component<'item.price-list', true>;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsSectionSteps extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_steps';
  info: {
    displayName: 'Section Steps';
    icon: 'manyToMany';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mainTitle: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'item.short-text', true>;
    title: Schema.Attribute.RichText;
  };
}

export interface SectionsSectionTransparency extends Struct.ComponentSchema {
  collectionName: 'components_sections_section_transparencies';
  info: {
    displayName: 'Section Transparency';
    icon: 'layout';
  };
  attributes: {
    description: Schema.Attribute.Text;
    photo1: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    photo2: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.RichText;
    transparency_list: Schema.Attribute.Component<'item.simple-text', true>;
  };
}

export interface WorkersWorkersList extends Struct.ComponentSchema {
  collectionName: 'components_workers_workers_lists';
  info: {
    displayName: 'Workers List';
  };
  attributes: {
    description: Schema.Attribute.String;
    name: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'areas.area-list': AreasAreaList;
      'forms.form': FormsForm;
      'item.list': ItemList;
      'item.price-list': ItemPriceList;
      'item.short-text': ItemShortText;
      'item.simple-text': ItemSimpleText;
      'item.socials-list': ItemSocialsList;
      'sections.footer': SectionsFooter;
      'sections.header': SectionsHeader;
      'sections.section-about': SectionsSectionAbout;
      'sections.section-area': SectionsSectionArea;
      'sections.section-banner': SectionsSectionBanner;
      'sections.section-contact': SectionsSectionContact;
      'sections.section-faq': SectionsSectionFaq;
      'sections.section-form': SectionsSectionForm;
      'sections.section-hero': SectionsSectionHero;
      'sections.section-offers': SectionsSectionOffers;
      'sections.section-opinion': SectionsSectionOpinion;
      'sections.section-price': SectionsSectionPrice;
      'sections.section-steps': SectionsSectionSteps;
      'sections.section-transparency': SectionsSectionTransparency;
      'workers.workers-list': WorkersWorkersList;
    }
  }
}
