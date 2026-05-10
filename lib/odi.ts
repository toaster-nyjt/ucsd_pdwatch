import { ODI } from 'meridian-ui';

export const odi : ODI = {
    dataBinding: [{
        id: 'incidentBinding',
        binding: {
            itemId: '.id',
            internalAttributes: [
                { id: 'lat', value: '.lat' },
                { id: 'lng', value: '.lng' },
            ],
            attributes: [
                { id: 'category', value: '.category', roles:['title']},
                { id: 'location', value: '.location', roles:['key-attribute']},
                { id: 'date', value: '.date', roles:['tag']},
                { id: 'time', value: '.time', roles:['tag']},
                { id: 'direction', value: '.direction', roles:['tag']},
                { id: 'On Campus?', value: '.onCampus', roles:['tag']},
                { id: 'summary', value: '.summary', roles:['description']},
                { id: 'disposition', value: '.disposition', roles:['description']},
                { id: 'id', value: '.id', roles:['spec']},
            ]
        }
    }],
    overviews: [{
        bindingId: 'incidentBinding',
        type: 'grid',
        itemView: { type: 'vertical' },
        hiddenAttributes: ['spec'],
        className: "!flex !flex-wrap justify-center! !gap-x-2.5 !gap-y-2.25 !rounded-[25px] !px-12 !py-12 !drop-shadow-2xl max-w-[100vw]!",
        style: {
                boxShadow:
                    '0 4px 4px rgba(0,0,0,0.25), inset 0 4px 4px 7px rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(152, 193, 217, 0.42)',
            },
        itemClassName: "!rounded-[25px] !bg-light-powder !justify-start h-full",
        itemStyle: { boxShadow: '0 2px 4px 3px rgba(0,0,0,0.25)' },
        detailViews: [{
            type: 'basic',
            openFrom: ['item'],
            openIn: 'pop-up',
            shownAttributes: 'all'
        }]
    },
    {
        bindingId: 'incidentBinding',
        type: 'map',
        itemView: { type: 'pin'},
        shownAttributes: 'all',
        hiddenAttributes: ['date', 'spec', 'disposition'],
        googleMapsAPIKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? '',
        googleMapsAPIId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID ?? 'DEMO_MAP_ID',
        className: "!rounded-[25px] !px-0 !py-0 !drop-shadow-2xl max-h-[85vh]",
        itemClassName: "flex !rounded-[15px] !bg-light-powder p-1 [&_.i-c]:!items-start w-50",
        detailViews: [{
            type: 'basic',
            openFrom: ['item'],
            openIn: 'pop-up',
            shownAttributes: 'all'
        }]
    },
    {
        bindingId: 'incidentBinding',
        type: 'table',
        className: "!rounded-[25px] !overflow-hidden !px-0 !py-0 !drop-shadow-2xl",
        style: {
                boxShadow:
                    '0 4px 4px rgba(0,0,0,0.25), inset 0 4px 4px 7px rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(152, 193, 217, 0.42)',
            },
        itemClassName: "!bg-light-powder !justify-start h-full",
        itemStyle: { boxShadow: '0 2px 4px 3px rgba(0,0,0,0.25)' },
        detailViews: [{
            type: 'basic',
            openFrom: ['item'],
            openIn: 'pop-up',
            shownAttributes: 'all'
        }]
    }],
    malleability: {
        content: {
            disabled: false
        },
        composition: {
            types: []
        },
        layout: {
            disabled: true
        }
    }
}