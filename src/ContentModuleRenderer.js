'use client';

import { createClient } from 'contentful';
import { useEffect, useState } from 'react';

import ContentColumns from './components/ContentColumns/ContentColumns';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import TextBlock from './components/TextBlock/TextBlock';
import ImageAndText from './components/ImageAndText/ImageAndText';
import BannerContent from './components/BannerContent/BannerContent';
import SocialMediaGrid from './components/SocialMediaGrid/SocialMediaGrid';
import FeaturedNews from './components/FeaturedNews/FeaturedNews';
import Testimonials from './components/Testimonials/Testimonials';
import Jobs from './components/Jobs/Jobs';
import SidebarContent from './components/SidebarContent/SidebarContent';
import HeroSlider from './components/HeroSlider/HeroSlider';
import TestimonialsSlider from './components/TestimonialsSlider/TestimonialsSlider';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Archive from './components/Archive/Archive';
import MaxWidth from './components/Layout/MaxWidthContainer';
import archiveStyles from './components/Archive/archive.module.css';
import ContactForm from '@/src/components/ContactForm/ContactForm';

const ContentModuleRenderer = ({ module, token, space }) => {
  const contentTypeId = module.sys.contentType.sys.id;
  const [archiveContent, setArchiveContent] = useState(null);
  useEffect(() => {
    if (contentTypeId === 'archive') {
      const client = createClient({
        space: space,
        accessToken: token,
      });
      let orderBy = module.fields.orderBy;
      if (module.fields.reverseOrder) {
        orderBy = '-' + orderBy;
      }
      const fetchArchiveContent = async () => {
        const response = await client.getEntries({
          content_type: module.fields.contentType,
          order: orderBy,
          //limit: module.fields.limit,
        });

        if (response.items.length > 0) {
          setArchiveContent(response);
        }
      };
      fetchArchiveContent();
    }
  }, [contentTypeId, token, space, module.fields.orderBy, module.fields.reverseOrder, module.fields.contentType]);

  switch (contentTypeId) {
    case 'hero':
      return <Hero content={module.fields} />;
    case 'contactForm':
      return <ContactForm content={module.fields} />;
    case 'contentColumns':
      return <ContentColumns content={module.fields} />;
    case 'textBlock':
      return <TextBlock content={module.fields} />;
    case 'stats':
      return <Stats content={module.fields} />;
    case 'imageAndText':
      return <ImageAndText content={module.fields} />;
    case 'bannerContent':
      return <BannerContent content={module.fields} />;
    case 'testimonials':
      return <Testimonials content={module.fields} />;
    case 'testimonialsSlider':
      return <TestimonialsSlider content={module.fields} />;
    case 'socialMediaGrid':
      return <SocialMediaGrid content={module.fields} />;
    case 'featuredNews':
      return <FeaturedNews content={module.fields} />;
    case 'sidebarContent':
      return <SidebarContent content={module.fields} />;
    case 'heroSlider':
      return <HeroSlider content={module.fields} />;
    case 'jobs':
      return <Jobs content={module.fields} />;
    case 'imageSlider':
      return <ImageSlider content={module.fields} />;
    case 'archive':
      return (
        <MaxWidth>
          <section className={archiveStyles.article}>
            {module.fields.showTitle && <h2 className={archiveStyles.archiveTitle}>{module.fields.title}</h2>}
            <Archive
              usePagination={module.fields.usePagination}
              perPage={module.fields.limit}
              content={archiveContent}
            ></Archive>
          </section>
        </MaxWidth>
      );
    default:
      console.warn(`Content type: ${contentTypeId} does not exist`);
      return null;
  }
};

export default ContentModuleRenderer;
