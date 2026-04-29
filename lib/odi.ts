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
                { id: 'date', value: '.date', roles:['key-attribute']},
                { id: 'time', value: '.time', roles:['key-attribute']},
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
        className: "!flex !flex-wrap !justify-center !gap-x-2.5 !gap-y-2.25 !rounded-[35px] !px-2 !py-4 !drop-shadow-2xl",
        style: {
                boxShadow:
                    '0 4px 4px rgba(0,0,0,0.25), inset 0 4px 4px 7px rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(152, 193, 217, 0.42)',
            },
        itemClassName: "!rounded-[31px] !bg-light-powder",
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
            types: ['toggle']
        }
    }
}