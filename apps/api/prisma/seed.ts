import { PrismaClient } from '@prisma/client';
import { kebabCase } from './util';
const prisma = new PrismaClient();

const base:any = {
  pushup: { primary: ['chest','triceps'], secondary: ['front-delts','core'], tags: ['bodyweight','horizontal-push'],
    variants: [['Knee Push-up','beginner', 3.2],['Incline Push-up','beginner', 3.5],['Standard Push-up','beginner', 4.0],['Decline Push-up','intermediate', 4.2],['Diamond Push-up','intermediate', 4.5],['Archer Push-up','advanced', 5.0],['Pseudo Planche Push-up','advanced', 5.5]] },
  squat: { primary: ['quads','glutes'], secondary: ['hamstrings','calves','core'], tags: ['bodyweight','knee-dominant'],
    variants: [['Assisted Squat','beginner', 3.0],['Air Squat','beginner', 3.5],['Tempo Squat (3-1-3)','intermediate', 4.0],['Jump Squat','intermediate', 5.0],['Pistol Squat (to box)','advanced', 5.5],['Pistol Squat','advanced', 6.0]] },
  lunge: { primary: ['quads','glutes'], secondary: ['hamstrings','calves','core'], tags: ['bodyweight','unilateral'],
    variants: [['Reverse Lunge','beginner', 3.5],['Forward Lunge','beginner', 3.8],['Walking Lunge','intermediate', 4.5],['Jumping Lunge','advanced', 5.5]] },
  pull: { primary: ['lats','biceps'], secondary: ['rear-delts','forearms','core'], tags: ['bodyweight','vertical-pull'],
    variants: [['Australian Row (low bar)','beginner', 3.5],['Inverted Row','beginner', 3.8],['Chin-up','intermediate', 6.0],['Pull-up','intermediate', 6.5],['Wide-grip Pull-up','advanced', 7.0],['L-sit Pull-up','advanced', 7.5]] },
  dip: { primary: ['triceps','chest'], secondary: ['front-delts','lats'], tags: ['bodyweight','vertical-push'],
    variants: [['Bench Dip','beginner', 3.5],['Bar Dip (assisted)','intermediate', 5.0],['Ring Dip','advanced', 6.5]] },
  core: { primary: ['abs'], secondary: ['hip-flexors','obliques'], tags: ['core'],
    variants: [['Dead Bug','beginner', 2.5],['Plank','beginner', 3.0],['Side Plank','beginner', 3.0],['Hollow Body Hold','intermediate', 3.5],['Hanging Knee Raise','intermediate', 4.0],['Hanging Leg Raise','advanced', 4.5],['Toes-to-Bar','advanced', 5.0]] },
  handstand: { primary: ['shoulders','triceps'], secondary: ['upper-back','core'], tags: ['skill','balance','vertical-push'],
    variants: [['Wall Handstand Hold','intermediate', 4.0],['Wall Handstand Shoulder Tap','advanced', 5.0],['Freestanding Handstand','advanced', 5.5]] }
};

function buildExercises(){
  const list:any[] = [];
  for (const def of Object.values(base) as any[]) {
    for (const [name, skill, met] of def.variants) {
      list.push({
        name,
        slug: kebabCase(name),
        primaryMuscles: def.primary,
        secondaryMuscles: def.secondary,
        equipment: ['bodyweight'],
        skill, met,
        instructions: ['Set up with tight core and neutral spine.','Control the eccentric, explosive concentric.','Maintain consistent breathing and range of motion.'],
        regressions: ['Easier leverage','Decrease range','Assisted variation'],
        progressions: ['Harder leverage','Increase tempo demand','Unstable apparatus'],
        tags: def.tags
      });
    }
  }
  const extras = [
    ['Burpee','full-body', 8.0], ['Mountain Climbers','core', 6.0], ['Jump Rope','conditioning', 9.0],
    ['Hip Hinge Good Morning','posterior-chain', 3.0], ['Cossack Squat','mobility', 3.0],
    ['Calf Raise','calves', 3.0], ['Glute Bridge','glutes', 3.5], ['Nordic Curl (assisted)','hamstrings', 5.0],
    ['Superman','lower-back', 2.5], ['Band Pull-Apart','upper-back', 2.5], ['Pike Push-up','shoulders', 4.5],
    ['Wall Sit','quads', 3.0], ['Russian Twist','obliques', 3.0], ['Bear Crawl','core', 4.0],
    ['Hollow Rock','core', 3.5], ['Arch Hold','posterior-chain', 3.0], ['Skater Jump','lateral', 5.0],
    ['Single-leg RDL (bw)','posterior-chain', 3.5], ['Ring Row','upper-back', 4.0], ['Ring Support Hold','core', 3.5]
  ];
  extras.forEach(([name, tag, met])=> list.push({
    name, slug: kebabCase(name as string), primaryMuscles: [tag as string], secondaryMuscles: [],
    equipment: ['bodyweight'], skill: 'beginner', met: met as number,
    instructions: ['Maintain control and alignment.'], regressions: [], progressions: [], tags: ['bodyweight']
  }));
  return list;
}

export async function main(){
  await prisma.$executeRawUnsafe('CREATE EXTENSION IF NOT EXISTS pg_trgm');
  const exs = buildExercises();
  for (const e of exs) {
    await prisma.exercise.upsert({ where: { slug: e.slug }, update: e, create: e });
  }
  console.log(`Seeded ${exs.length} exercises.`);
}
main().finally(()=>prisma.$disconnect());
