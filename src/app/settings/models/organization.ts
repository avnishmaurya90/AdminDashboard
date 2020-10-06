class SocialLinks {
  facebook: string;
  linkedin: string;
  twitter: string;
}

class Contact {
  webSite: string;
  salesEmail: string;
  infoEmail: string;
  invoiceEmail: String;
  helpline: string;
}

class Address {
  street: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}

class SeoMetaTags {
  field1: string;
  field2: string;
  field3: string;
}

export class Organization {
  id: string;
  info: string;
  logoUrl: string;
  googleAnalytics: string;
  socialLinks: SocialLinks;
  contact: Contact;
  address: Address;
  seoMetaTags: SeoMetaTags;

  constructor(entity) {
    this.id = entity.id;
    this.info = entity.info;
    this.logoUrl = entity.logoUrl;
    this.googleAnalytics = entity.googleAnalytics;
    this.socialLinks = entity.socialLinks;
    this.contact = entity.contact;
    this.address = entity.address;
    this.seoMetaTags = entity.seoMetaTags;
  }
}
