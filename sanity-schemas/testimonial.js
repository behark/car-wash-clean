// Sanity schema for testimonials
// Add this to your Sanity Studio schemas

export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'contentFi',
      title: 'Content (Finnish)',
      type: 'text',
      validation: Rule => Rule.required().max(500)
    },
    {
      name: 'contentEn',
      title: 'Content (English)',
      type: 'text',
      validation: Rule => Rule.max(500)
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      options: {
        list: [
          {title: '1 Star', value: 1},
          {title: '2 Stars', value: 2},
          {title: '3 Stars', value: 3},
          {title: '4 Stars', value: 4},
          {title: '5 Stars', value: 5}
        ]
      }
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Only approved testimonials will be shown on the website'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear prominently on the homepage'
    }
  ],
  orderings: [
    {
      title: 'Date Created (newest first)',
      name: 'dateDesc',
      by: [
        {field: '_createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'Rating (highest first)',
      name: 'ratingDesc',
      by: [
        {field: 'rating', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'contentFi',
      rating: 'rating',
      approved: 'approved'
    },
    prepare(selection) {
      const {title, subtitle, rating, approved} = selection
      const stars = '⭐'.repeat(rating)
      const status = approved ? '✅' : '⏳'
      return {
        title: `${title} ${stars}`,
        subtitle: `${status} ${subtitle?.substring(0, 50)}...`
      }
    }
  }
}