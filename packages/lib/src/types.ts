export type Role = 'user' | 'admin';
export type Quality = 'low' | 'medium' | 'high';
export type Equipment = 'bodyweight' | 'bar' | 'rings' | 'dumbbell' | 'kettlebell' | 'band' | 'parallettes' | 'door-anchor';
export type Skill = 'beginner' | 'intermediate' | 'advanced';
export interface Exercise {
  id: string;
  name: string;
  slug: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: Equipment[];
  skill: Skill;
  met: number;
  instructions: string[];
  regressions: string[];
  progressions: string[];
  tags: string[];
  assets?: { video?: string; poster?: string; gltf?: string; hdri?: string };
}
