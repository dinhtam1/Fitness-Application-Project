const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const insertDataEquipment = async () => {
    await prisma.equipment.createMany({
        data: [
            {
                equipmentId: 1,
                equipmentName: 'Barbell',
                image : 'https://media.istockphoto.com/id/1335474486/vi/vec-to/kh%C3%A1i-ni%E1%BB%87m-m%E1%BA%A1nh-m%E1%BA%BD-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-barbell-trong-tay.jpg?s=612x612&w=0&k=20&c=tJOBJTFdYOrKjtqHV7NK-MQ3L0N2O1qS5XuTBV3WHX8='

            },
            {
                equipmentId: 2,
                equipmentName: 'Dumbbells',
                image : 'https://www.bullrockfitness.com/wp-content/uploads/2021/05/urethane_round_dumbbells-1024x1024.jpg'

            },
            {
                equipmentId: 3,
                equipmentName: 'Bodyweight',
                image : 'https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/04/triceps-pushup-lean-muscular.jpg?quality=86&strip=all'

            },
            {
                equipmentId: 4,
                equipmentName: 'Machine',
                image : 'https://5.imimg.com/data5/SELLER/Default/2022/4/TD/AT/HT/46380693/multi-home-gym-multiple-muscle-workout-exercise-machine.jpg'

            },
            {
                equipmentId: 6,
                equipmentName: 'Medicine-Ball',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMmIPNZuZJ6M9vxKFJjsu4arCQ_OuymCi7US5OUdB_MA&s'

            },
            {
                equipmentId: 7,
                equipmentName: 'Kettlebells',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxPCJ_KqWtFA8zZfV4s406TmqwLBZnwPf8vMaPCOrKdg&s'

            },
            {
                equipmentId: 8,
                equipmentName: 'Stretches',
                image : 'https://www.verywellfit.com/thmb/NLBM2fsq8s-wl3j0Tx0GImtPPr0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FINAL_VWFitFitnessAnnotations41-5b75d38146e0fb00507d4a6a.jpg'

            },
            {
                equipmentId: 9,
                equipmentName: 'Cables',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Ng2zCI44ycg39Kby3aA85ag0IBE-HE75l4SLGhx9ow&s'

            },
            {
                equipmentId: 10,
                equipmentName: 'Band',
                image : 'https://i5.walmartimages.com/seo/Resistance-Loops-Exercise-Latex-Rubber-Bands-Fitness-Yoga-Training-Gym-Random-Color_a512f0d7-6ea2-4294-84c9-c4815fec11a3_1.799b7fd39dc7a25e96192673c7322a64.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'

            },
            {
                equipmentId: 11,
                equipmentName: 'Plate',
                image : 'https://4.imimg.com/data4/EI/ET/MY-17231037/steel-gym-plate-500x500.jpg'

            },
            {
                equipmentId: 12,
                equipmentName: 'TRX',
                image : 'https://gym-experts.com/cdn/shop/products/TRXCommercial1_600x.PNG?v=1548958306'

            },
            {
                equipmentId: 13,
                equipmentName: 'Yoga',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-v8j1gMNoJslBYG2rT315868Hq5WOvja3ecXI3kGxA&s'

            },
            {
                equipmentId: 24,
                equipmentName: 'Bosu-Ball',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrVHTr4DnbzEMiQs5LhuWcP1G96erT8axwbAdJciCPsw&s'

            },
            {
                equipmentId: 26,
                equipmentName: 'Vitruvian',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRopqFtayypZZlwAzyQptI1rFLnaMAnQkcCaftEmwJSHg&s'

            },
            {
                equipmentId: 27,
                equipmentName: 'Cardio',
                image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpVwwCcj81M2v-RepQWLCxFNdRBXu0-YRp1ZgCwExaQ&s'

            },
            {
                equipmentId: 85,
                equipmentName: 'Smith-Machine',
                image : 'https://static.wixstatic.com/media/9ab980_d1c9627fe4ef4bbf9553d1324d17a3d6~mv2_d_1200_1200_s_2.jpg/v1/fill/w_560,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9ab980_d1c9627fe4ef4bbf9553d1324d17a3d6~mv2_d_1200_1200_s_2.jpg'

            }
        ]
    })
}

module.exports = {
    insertDataEquipment
}