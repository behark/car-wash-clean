// Sanity schema for services
// Add this to your Sanity Studio schemas

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'titleFi',
      title: 'Title (Finnish)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string'
    },
    {
      name: 'descriptionFi',
      title: 'Description (Finnish)',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text'
    },
    {
      name: 'price',
      title: 'Price (EUR)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Wash', value: 'wash'},
          {title: 'Tire', value: 'tire'},
          {title: 'Additional', value: 'additional'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    }
  ],
  orderings: [
    {
      title: 'Category, then Price',
      name: 'categoryPrice',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'price', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'titleFi',
      subtitle: 'category',
      price: 'price',
      media: 'image'
    },
    prepare(selection) {
      const {title, subtitle, price} = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${price}€`
      }
    }
  }
}