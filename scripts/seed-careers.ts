import { createClient } from '@supabase/supabase-js';

export interface CareerSeedData {
  title: string;
  slug: string;
  primary_archetype: string;
  secondary_archetype: string | null;
  defensibility_score: number;
  factor_physical_presence: number;
  factor_human_judgment: number;
  factor_creative_originality: number;
  factor_relationship_dependency: number;
  factor_regulatory_barrier: number;
  entry_salary_low: number;
  entry_salary_high: number;
  mid_salary_low: number;
  mid_salary_high: number;
  senior_salary_low: number;
  senior_salary_high: number;
  day_to_day_description: string;
  ai_impact_analysis: string;
  skills_to_develop: Array<{
    skill: string;
    priority: 'high' | 'medium' | 'low';
    how_to_develop: string;
  }>;
  education_path: {
    type: 'degree' | 'trade' | 'apprenticeship' | 'self_taught';
    details: string;
    duration: string;
  };
  real_world_examples: Array<{
    name: string;
    role: string;
    achievement: string;
  }>;
  status: 'active';
}

export const CAREERS: CareerSeedData[] = [
  // BUILDER ARCHETYPE
  {
    title: 'Commercial Electrician',
    slug: 'commercial-electrician',
    primary_archetype: 'Builder',
    secondary_archetype: null,
    defensibility_score: 88,
    factor_physical_presence: 95,
    factor_human_judgment: 85,
    factor_creative_originality: 60,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 95,
    entry_salary_low: 32000,
    entry_salary_high: 42000,
    mid_salary_low: 52000,
    mid_salary_high: 68000,
    senior_salary_low: 75000,
    senior_salary_high: 95000,
    day_to_day_description: 'You install, maintain, and repair electrical systems in office buildings, factories, and malls. Your days involve reading blueprints, running wire, troubleshooting broken circuits, and making sure everything is up to code. Safety is huge—one mistake could be really dangerous.',
    ai_impact_analysis: 'AI can model electrical systems and predict maintenance needs, but the physical installation, hands-on problem-solving, and safety judgment still require experienced humans. Electricians will increasingly use diagnostic tools powered by AI to work faster.',
    skills_to_develop: [
      {
        skill: 'Blueprint Reading & Electrical Code',
        priority: 'high',
        how_to_develop: 'Take trade school courses focused on electrical codes (NEC) and blueprint interpretation. Study 40-60 hours per week for 2-3 years in an apprenticeship.'
      },
      {
        skill: 'Troubleshooting & Problem-Solving',
        priority: 'high',
        how_to_develop: 'Learn through hands-on apprenticeships under experienced electricians. Work on real equipment failures to develop diagnostic intuition.'
      },
      {
        skill: 'Safety Management',
        priority: 'high',
        how_to_develop: 'Complete OSHA training, CPR certification, and site safety courses. Practice hazard identification on every job.'
      }
    ],
    education_path: {
      type: 'apprenticeship',
      details: 'Complete a 4-5 year electrician apprenticeship through a union or trade organization. Combine 2000 hours of on-the-job training with classroom instruction.',
      duration: '4-5 years'
    },
    real_world_examples: [
      {
        name: 'Mike Rowe',
        role: 'Master Electrician & TV Host',
        achievement: 'Documented the importance of skilled trades to American infrastructure and inspired thousands to pursue electrical careers.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Civil Engineer',
    slug: 'civil-engineer',
    primary_archetype: 'Builder',
    secondary_archetype: 'Strategist',
    defensibility_score: 76,
    factor_physical_presence: 70,
    factor_human_judgment: 80,
    factor_creative_originality: 75,
    factor_relationship_dependency: 70,
    factor_regulatory_barrier: 85,
    entry_salary_low: 52000,
    entry_salary_high: 65000,
    mid_salary_low: 70000,
    mid_salary_high: 90000,
    senior_salary_low: 95000,
    senior_salary_high: 130000,
    day_to_day_description: 'You design and oversee construction projects like bridges, roads, buildings, and water systems. You work with architects, contractors, and government agencies to make sure projects are safe, environmentally sound, and built on time. You spend time at computers designing and at job sites checking progress.',
    ai_impact_analysis: 'AI tools are revolutionizing design optimization and cost prediction, but civil engineers still need to understand structural principles, navigate regulations, and make judgment calls about public safety. Human expertise in project management and stakeholder coordination remains essential.',
    skills_to_develop: [
      {
        skill: 'CAD & Design Software',
        priority: 'high',
        how_to_develop: 'Learn AutoCAD, Civil 3D, and structural analysis software through university courses and hands-on projects. Complete 100+ hours of software practice.'
      },
      {
        skill: 'Project Management & Leadership',
        priority: 'high',
        how_to_develop: 'Pursue a Project Management Professional (PMP) certification. Lead small teams on projects and learn scheduling, budgeting, and risk management.'
      },
      {
        skill: 'Regulatory & Environmental Knowledge',
        priority: 'medium',
        how_to_develop: 'Study environmental regulations, zoning laws, and building codes specific to your region. Take courses in sustainable design and environmental engineering.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Civil Engineering (ABET accredited). Pursue Professional Engineer (PE) licensure by passing the Fundamentals of Engineering (FE) exam and gaining 4 years of work experience.',
      duration: '4 years + apprenticeship'
    },
    real_world_examples: [
      {
        name: 'Gustave Eiffel',
        role: 'Structural Engineer',
        achievement: 'Designed the Eiffel Tower and pioneered the use of iron in large-scale construction, revolutionizing civil engineering.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Robotics Technician',
    slug: 'robotics-technician',
    primary_archetype: 'Builder',
    secondary_archetype: 'Creator',
    defensibility_score: 82,
    factor_physical_presence: 85,
    factor_human_judgment: 80,
    factor_creative_originality: 85,
    factor_relationship_dependency: 60,
    factor_regulatory_barrier: 75,
    entry_salary_low: 38000,
    entry_salary_high: 50000,
    mid_salary_low: 55000,
    mid_salary_high: 75000,
    senior_salary_low: 80000,
    senior_salary_high: 110000,
    day_to_day_description: 'You build, test, and repair robots used in manufacturing, research, and medical settings. You work with mechanical parts, electronics, and programming to make robots do what they\'re designed for. Problem-solving is constant—when a robot breaks or doesn\'t work right, you figure out why and fix it.',
    ai_impact_analysis: 'AI is enhancing robot capabilities and autonomous function, but technicians are needed to physically maintain equipment, diagnose hardware issues, and customize robots for specific tasks. The role is expanding as robots become more prevalent.',
    skills_to_develop: [
      {
        skill: 'Mechanical & Electrical Assembly',
        priority: 'high',
        how_to_develop: 'Take robotics courses in trade schools or vocational programs. Build robots from kits and learn through hands-on assembly and troubleshooting.'
      },
      {
        skill: 'Programming & Control Systems',
        priority: 'high',
        how_to_develop: 'Learn Python, C++, and ROS (Robot Operating System). Take courses on microcontroller programming and PLC systems.'
      },
      {
        skill: 'Mechanical Problem-Solving',
        priority: 'medium',
        how_to_develop: 'Work on real robots, study failures, and experiment with modifications. Learn through apprenticeships in robotics companies.'
      }
    ],
    education_path: {
      type: 'trade',
      details: 'Complete a robotics technician certification program at a community college or trade school (2 years). Combine classroom learning with hands-on lab work and internships at robotics companies.',
      duration: '2-3 years'
    },
    real_world_examples: [
      {
        name: 'Rodney Brooks',
        role: 'Roboticist & Entrepreneur',
        achievement: 'Founded iRobot and created the Roomba, revolutionizing consumer robotics and demonstrating the importance of practical engineering expertise.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Custom Furniture Maker',
    slug: 'custom-furniture-maker',
    primary_archetype: 'Builder',
    secondary_archetype: 'Creator',
    defensibility_score: 85,
    factor_physical_presence: 95,
    factor_human_judgment: 80,
    factor_creative_originality: 90,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 40,
    entry_salary_low: 28000,
    entry_salary_high: 40000,
    mid_salary_low: 50000,
    mid_salary_high: 70000,
    senior_salary_low: 75000,
    senior_salary_high: 120000,
    day_to_day_description: 'You design and build one-of-a-kind or semi-custom furniture for clients. Every day involves sketching ideas, measuring spaces, selecting materials, and crafting pieces at your workshop. You work with wood, metal, or other materials, using both hand tools and machinery. Client relationships are key since you\'re building something personal for them.',
    ai_impact_analysis: 'AI can optimize designs and material usage, but the creative vision, craftsmanship, and hands-on building remain uniquely human skills. Custom work thrives on personal relationships and creative problem-solving that can\'t be automated.',
    skills_to_develop: [
      {
        skill: 'Furniture Design & Spatial Planning',
        priority: 'high',
        how_to_develop: 'Study design principles, learn CAD software, and practice sketching. Take courses in furniture design at art schools or design institutes.'
      },
      {
        skill: 'Woodworking & Craftsmanship',
        priority: 'high',
        how_to_develop: 'Learn through apprenticeships with master craftspeople. Build projects and develop expertise in joinery, finishing, and material selection.'
      },
      {
        skill: 'Client Communication & Project Management',
        priority: 'medium',
        how_to_develop: 'Work directly with clients, learn to understand their vision, and manage timelines. Build a portfolio and gather testimonials.'
      }
    ],
    education_path: {
      type: 'apprenticeship',
      details: 'Apprentice under a master furniture maker for 3-4 years while learning design and technical skills. Many also earn degrees in furniture design or fine arts.',
      duration: '3-4 years'
    },
    real_world_examples: [
      {
        name: 'George Nakashima',
        role: 'Master Furniture Craftsman',
        achievement: 'Created iconic handcrafted furniture using natural wood, proving the enduring value of bespoke craftsmanship in a mass-produced world.'
      }
    ],
    status: 'active'
  },

  // HEALER ARCHETYPE
  {
    title: 'Emergency Room Nurse',
    slug: 'emergency-room-nurse',
    primary_archetype: 'Healer',
    secondary_archetype: 'Guardian',
    defensibility_score: 92,
    factor_physical_presence: 100,
    factor_human_judgment: 95,
    factor_creative_originality: 70,
    factor_relationship_dependency: 90,
    factor_regulatory_barrier: 95,
    entry_salary_low: 48000,
    entry_salary_high: 60000,
    mid_salary_low: 65000,
    mid_salary_high: 85000,
    senior_salary_low: 85000,
    senior_salary_high: 110000,
    day_to_day_description: 'You work in fast-paced emergency departments helping people in crisis. You assess patients, administer medications, monitor vital signs, and support doctors during emergencies. One moment you\'re helping someone with a broken arm, the next you\'re responding to a life-threatening situation. You need to stay calm under pressure and make quick decisions.',
    ai_impact_analysis: 'AI can help with triage recommendations and vital sign monitoring, but nurses provide irreplaceable empathy, complex clinical judgment, and physical care that critical patients desperately need. The human element is absolutely central to emergency care.',
    skills_to_develop: [
      {
        skill: 'Clinical Assessment & Critical Thinking',
        priority: 'high',
        how_to_develop: 'Complete your RN program with strong clinical rotations. Practice assessing patients under supervision and build pattern recognition skills.'
      },
      {
        skill: 'Emergency Protocols & Advanced Life Support',
        priority: 'high',
        how_to_develop: 'Complete ACLS (Advanced Cardiac Life Support) and BLS (Basic Life Support) certifications. Specialize in emergency nursing through certifications like CEN (Certified Emergency Nurse).'
      },
      {
        skill: 'Communication Under Stress',
        priority: 'high',
        how_to_develop: 'Practice de-escalation techniques, work with difficult patients, and develop emotional intelligence. Participate in team training and simulations.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor of Science in Nursing (BSN) from an accredited program. Pass the NCLEX-RN licensing exam. Complete additional certifications in emergency nursing.',
      duration: '4 years + licensing'
    },
    real_world_examples: [
      {
        name: 'Florence Nightingale',
        role: 'Pioneering Nurse',
        achievement: 'Revolutionized nursing during the Crimean War, proving that skilled nursing care and data-driven decisions could save lives and transform healthcare.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Physical Therapist',
    slug: 'physical-therapist',
    primary_archetype: 'Healer',
    secondary_archetype: null,
    defensibility_score: 87,
    factor_physical_presence: 95,
    factor_human_judgment: 90,
    factor_creative_originality: 75,
    factor_relationship_dependency: 85,
    factor_regulatory_barrier: 90,
    entry_salary_low: 55000,
    entry_salary_high: 68000,
    mid_salary_low: 75000,
    mid_salary_high: 95000,
    senior_salary_low: 100000,
    senior_salary_high: 135000,
    day_to_day_description: 'You help people recover from injuries and improve their movement and function. You work with patients recovering from surgery, athletes with injuries, or people with chronic conditions. Each session involves exercises, hands-on treatment, and lots of encouragement. You tailor every plan to the individual.',
    ai_impact_analysis: 'AI can optimize exercise plans and track progress, but physical therapy requires human touch, assessment of pain and movement, and the motivational relationship that drives patient recovery. The hands-on skilled work is difficult to automate.',
    skills_to_develop: [
      {
        skill: 'Anatomy, Physiology & Movement Science',
        priority: 'high',
        how_to_develop: 'Master these subjects through your doctorate program. Study human movement patterns, biomechanics, and rehabilitation principles.'
      },
      {
        skill: 'Manual Therapy & Treatment Techniques',
        priority: 'high',
        how_to_develop: 'Complete specialized certifications in manual therapy (like AAPT or IAOM). Practice hands-on techniques under supervision.'
      },
      {
        skill: 'Patient Motivation & Education',
        priority: 'medium',
        how_to_develop: 'Work directly with diverse patients. Learn motivational interviewing and teach people to self-manage their recovery.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Doctor of Physical Therapy (DPT) degree from an accredited program (3 years). Pass the NPTE licensing exam. Consider additional specializations.',
      duration: '3 years post-bachelor\'s + licensing'
    },
    real_world_examples: [
      {
        name: 'Paul McCreesh',
        role: 'Sports Physical Therapist',
        achievement: 'Pioneered sports rehabilitation techniques that have helped top athletes return to peak performance after severe injuries.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Veterinarian',
    slug: 'veterinarian',
    primary_archetype: 'Healer',
    secondary_archetype: 'Guardian',
    defensibility_score: 84,
    factor_physical_presence: 90,
    factor_human_judgment: 90,
    factor_creative_originality: 70,
    factor_relationship_dependency: 80,
    factor_regulatory_barrier: 95,
    entry_salary_low: 50000,
    entry_salary_high: 65000,
    mid_salary_low: 80000,
    mid_salary_high: 110000,
    senior_salary_low: 120000,
    senior_salary_high: 160000,
    day_to_day_description: 'You care for animals—from house pets to livestock. You diagnose diseases, perform surgeries, prescribe medications, and counsel pet owners. Some days you\'re performing surgery, other days you\'re comforting a sick animal or advising on nutrition and behavior. You need to love animals and be good with people too.',
    ai_impact_analysis: 'AI can assist with diagnosis and imaging analysis, but veterinarians provide irreplaceable physical examination skills, surgical expertise, and the ability to assess animal behavior and communicate with owners. Empathy and judgment are central to the role.',
    skills_to_develop: [
      {
        skill: 'Anatomy, Physiology & Disease Recognition',
        priority: 'high',
        how_to_develop: 'Master these through veterinary school. Study multiple species and understand disease processes and diagnostic techniques.'
      },
      {
        skill: 'Surgical & Medical Skills',
        priority: 'high',
        how_to_develop: 'Gain hands-on experience through veterinary internships and rotations. Practice surgical techniques and develop clinical judgment.'
      },
      {
        skill: 'Client Communication & Business Sense',
        priority: 'medium',
        how_to_develop: 'Work in veterinary clinics during school. Learn to explain medical concepts to pet owners and manage a practice business.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Complete a Doctor of Veterinary Medicine (DVM) degree from an accredited veterinary school (4 years). Pass the NAVLE licensing exam. Consider internships and specializations.',
      duration: '4 years + licensing'
    },
    real_world_examples: [
      {
        name: 'James Herriot',
        role: 'Veterinarian & Author',
        achievement: 'Documented the art and science of veterinary practice in rural England, showing the profound impact of veterinary care on animals and their families.'
      }
    ],
    status: 'active'
  },
  {
    title: 'School Counselor',
    slug: 'school-counselor',
    primary_archetype: 'Healer',
    secondary_archetype: 'Connector',
    defensibility_score: 79,
    factor_physical_presence: 70,
    factor_human_judgment: 90,
    factor_creative_originality: 75,
    factor_relationship_dependency: 90,
    factor_regulatory_barrier: 75,
    entry_salary_low: 35000,
    entry_salary_high: 48000,
    mid_salary_low: 52000,
    mid_salary_high: 68000,
    senior_salary_low: 70000,
    senior_salary_high: 95000,
    day_to_day_description: 'You support students\' emotional, social, and academic development. You listen to their problems, help them navigate friendships and family issues, and guide them toward college or career paths. You might counsel a student through anxiety, mediate peer conflicts, or advise on choosing classes. You\'re part counselor, part mentor, part advocate.',
    ai_impact_analysis: 'AI can help identify at-risk students and provide mental health resources, but students need human connection, empathy, and someone who knows them personally. The therapeutic relationship is irreplaceable and central to counseling effectiveness.',
    skills_to_develop: [
      {
        skill: 'Counseling & Active Listening',
        priority: 'high',
        how_to_develop: 'Complete a master\'s program in school counseling. Practice counseling skills in supervised settings and earn certifications.'
      },
      {
        skill: 'Child & Adolescent Development',
        priority: 'high',
        how_to_develop: 'Study developmental psychology and trauma-informed practices. Work with diverse student populations during your internship.'
      },
      {
        skill: 'College & Career Guidance',
        priority: 'medium',
        how_to_develop: 'Learn about college admissions, financial aid, and career pathways. Stay updated on labor market trends and educational opportunities.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Master\'s degree in School Counseling from an accredited program (2 years post-bachelor\'s). Complete supervised internship hours and pass state licensure exams.',
      duration: '2 years + internship'
    },
    real_world_examples: [
      {
        name: 'Nel Noddings',
        role: 'Education Theorist & Counselor',
        achievement: 'Developed care-centered approaches to education, demonstrating how human relationships and empathy are foundational to student success.'
      }
    ],
    status: 'active'
  },

  // STRATEGIST ARCHETYPE
  {
    title: 'Urban Planner',
    slug: 'urban-planner',
    primary_archetype: 'Strategist',
    secondary_archetype: 'Builder',
    defensibility_score: 73,
    factor_physical_presence: 60,
    factor_human_judgment: 85,
    factor_creative_originality: 80,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 85,
    entry_salary_low: 45000,
    entry_salary_high: 58000,
    mid_salary_low: 65000,
    mid_salary_high: 85000,
    senior_salary_low: 90000,
    senior_salary_high: 120000,
    day_to_day_description: 'You shape how cities and neighborhoods develop. You analyze land use, design transportation systems, and work with communities and developers on projects. You balance competing interests—affordability, environmental impact, growth, and quality of life. Your work happens in meetings, on GIS software, and walking neighborhoods.',
    ai_impact_analysis: 'AI can process massive datasets and generate design alternatives, but urban planning requires understanding human behavior, community values, political feasibility, and long-term consequences. Strategic judgment about what makes communities livable remains fundamentally human.',
    skills_to_develop: [
      {
        skill: 'GIS, Data Analysis & Planning Software',
        priority: 'high',
        how_to_develop: 'Learn ArcGIS, QGIS, and urban design software. Take courses in urban data analysis and spatial visualization.'
      },
      {
        skill: 'Urban Design & Policy Knowledge',
        priority: 'high',
        how_to_develop: 'Study zoning codes, comprehensive planning processes, and urban design principles. Understand sustainability and housing policy.'
      },
      {
        skill: 'Stakeholder Engagement & Communication',
        priority: 'high',
        how_to_develop: 'Facilitate community meetings, present to city councils, and learn to explain complex plans simply. Develop negotiation skills.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Master\'s degree in Urban Planning or City Planning from an ACSP-accredited program (2 years post-bachelor\'s). Some programs offer combined degrees with architecture or engineering.',
      duration: '2 years post-bachelor\'s'
    },
    real_world_examples: [
      {
        name: 'Jane Jacobs',
        role: 'Urban Theorist & Activist',
        achievement: 'Challenged top-down urban planning and proved that livable cities emerge from human-centered design and organic neighborhood development.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Management Consultant',
    slug: 'management-consultant',
    primary_archetype: 'Strategist',
    secondary_archetype: null,
    defensibility_score: 58,
    factor_physical_presence: 40,
    factor_human_judgment: 70,
    factor_creative_originality: 65,
    factor_relationship_dependency: 70,
    factor_regulatory_barrier: 30,
    entry_salary_low: 70000,
    entry_salary_high: 90000,
    mid_salary_low: 110000,
    mid_salary_high: 160000,
    senior_salary_low: 180000,
    senior_salary_high: 250000,
    day_to_day_description: 'You analyze business problems and recommend solutions to help companies work better. You dive into companies\' operations, interview staff, analyze data, and figure out what\'s broken. Then you present recommendations—cutting costs, reorganizing teams, changing strategies. You\'re part analyst, part strategist, part salesperson.',
    ai_impact_analysis: 'AI can analyze operational data and identify inefficiencies faster than consultants, potentially reducing demand for analytical consulting work. However, change management, strategic thinking, and client relationships remain valuable.',
    skills_to_develop: [
      {
        skill: 'Business Analysis & Data Interpretation',
        priority: 'high',
        how_to_develop: 'Learn data analysis tools (Excel, Tableau, Python). Study business cases and develop financial modeling skills.'
      },
      {
        skill: 'Strategic Thinking & Problem-Solving',
        priority: 'high',
        how_to_develop: 'Take strategy courses, work on real business cases, and develop frameworks for analyzing complex problems.'
      },
      {
        skill: 'Client Communication & Presentation',
        priority: 'high',
        how_to_develop: 'Practice presenting to senior executives. Learn to translate analysis into clear, actionable recommendations.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Business, Economics, or a technical field. Many consultants get MBAs from top programs. Technical consultants may have engineering or computer science degrees.',
      duration: '4 years + optional MBA'
    },
    real_world_examples: [
      {
        name: 'Peter Drucker',
        role: 'Management Consultant & Theorist',
        achievement: 'Pioneered modern management consulting and organizational thinking, influencing how companies approach strategy and operations globally.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Military Officer',
    slug: 'military-officer',
    primary_archetype: 'Strategist',
    secondary_archetype: 'Guardian',
    defensibility_score: 81,
    factor_physical_presence: 85,
    factor_human_judgment: 85,
    factor_creative_originality: 65,
    factor_relationship_dependency: 80,
    factor_regulatory_barrier: 95,
    entry_salary_low: 38000,
    entry_salary_high: 45000,
    mid_salary_low: 60000,
    mid_salary_high: 85000,
    senior_salary_low: 95000,
    senior_salary_high: 160000,
    day_to_day_description: 'You lead military personnel and plan operations. This might mean commanding troops in the field, managing logistics, planning strategy, or overseeing specialized missions. You make high-stakes decisions, manage resources, and lead teams. The work is regimented but deeply meaningful.',
    ai_impact_analysis: 'AI is revolutionizing military planning and tactical analysis, but military operations require human leadership, ethical judgment, situational awareness, and the ability to adapt to unpredictable situations. Human command remains essential.',
    skills_to_develop: [
      {
        skill: 'Leadership & Team Management',
        priority: 'high',
        how_to_develop: 'Develop through officer training programs. Lead teams, learn to motivate personnel, and handle high-pressure situations.'
      },
      {
        skill: 'Tactical & Strategic Planning',
        priority: 'high',
        how_to_develop: 'Study military history, strategy, and operational planning. Learn through war colleges and joint military education.'
      },
      {
        skill: 'Technology & Equipment Expertise',
        priority: 'medium',
        how_to_develop: 'Gain expertise in your branch\'s technology and systems. Understand capabilities and limitations of military equipment.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Complete a bachelor\'s degree and attend Officer Candidate School (OCS) or graduate from a military academy. Specialize based on branch (Army, Navy, Air Force, Marines, Coast Guard).',
      duration: '4 years + officer training'
    },
    real_world_examples: [
      {
        name: 'Dwight D. Eisenhower',
        role: 'Military Officer & President',
        achievement: 'Demonstrated exceptional strategic planning and leadership during WWII, proving the value of military expertise in complex operations.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Supply Chain Director',
    slug: 'supply-chain-director',
    primary_archetype: 'Strategist',
    secondary_archetype: 'Operator',
    defensibility_score: 62,
    factor_physical_presence: 45,
    factor_human_judgment: 75,
    factor_creative_originality: 60,
    factor_relationship_dependency: 70,
    factor_regulatory_barrier: 65,
    entry_salary_low: 55000,
    entry_salary_high: 70000,
    mid_salary_low: 85000,
    mid_salary_high: 115000,
    senior_salary_low: 130000,
    senior_salary_high: 180000,
    day_to_day_description: 'You manage the flow of materials and products for a company. You work with suppliers, manage inventory, coordinate logistics, and optimize costs. You\'re responsible for making sure the right products get to the right place at the right time. You spend time analyzing data, managing relationships, and solving problems.',
    ai_impact_analysis: 'AI is rapidly automating supply chain optimization and demand forecasting, which could reduce the need for some planning roles. However, supplier relationships, strategic vendor management, and handling disruptions require human judgment.',
    skills_to_develop: [
      {
        skill: 'Supply Chain Optimization & Analytics',
        priority: 'high',
        how_to_develop: 'Learn ERP systems, demand planning software, and optimization tools. Study operations research and supply chain management.'
      },
      {
        skill: 'Vendor & Relationship Management',
        priority: 'high',
        how_to_develop: 'Build strong supplier relationships, negotiate contracts, and manage vendor performance. Develop negotiation and influence skills.'
      },
      {
        skill: 'Process Improvement & Lean Management',
        priority: 'medium',
        how_to_develop: 'Learn Lean and Six Sigma methodologies. Lead continuous improvement initiatives and measure process efficiency.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Supply Chain Management, Operations, or Business. Many pursue an MBA or APICS CSCP certification for advancement.',
      duration: '4 years + optional certifications'
    },
    real_world_examples: [
      {
        name: 'Wendy Mackenzie',
        role: 'Supply Chain Executive',
        achievement: 'Led supply chain transformation at major retailers, proving how effective supply chain management drives competitive advantage and profitability.'
      }
    ],
    status: 'active'
  },

  // CREATOR ARCHETYPE
  {
    title: 'Film Director',
    slug: 'film-director',
    primary_archetype: 'Creator',
    secondary_archetype: 'Connector',
    defensibility_score: 78,
    factor_physical_presence: 75,
    factor_human_judgment: 85,
    factor_creative_originality: 95,
    factor_relationship_dependency: 85,
    factor_regulatory_barrier: 30,
    entry_salary_low: 35000,
    entry_salary_high: 60000,
    mid_salary_low: 75000,
    mid_salary_high: 150000,
    senior_salary_low: 200000,
    senior_salary_high: 500000,
    day_to_day_description: 'You bring stories to life through film. You work with writers, cinematographers, actors, and production teams to create movies or shows. You make creative decisions about every aspect—visuals, performances, pacing, tone. Some days you\'re on set directing actors, other days you\'re in edit suites shaping the final product.',
    ai_impact_analysis: 'AI can generate visual effects and assist with editing, but the creative vision—understanding human emotion, storytelling, and how to move audiences—remains distinctly human. AI is a tool that enhances rather than replaces directorial creativity.',
    skills_to_develop: [
      {
        skill: 'Visual Storytelling & Cinematography',
        priority: 'high',
        how_to_develop: 'Study film history and theory. Direct short films, learn camera work, and develop an eye for visual composition.'
      },
      {
        skill: 'Actor Direction & Performance',
        priority: 'high',
        how_to_develop: 'Work with actors in productions, study acting techniques, and learn how to inspire performances. Direct theater or student films.'
      },
      {
        skill: 'Technical Production Skills',
        priority: 'medium',
        how_to_develop: 'Learn editing software (Premiere Pro, Final Cut), understand sound design, and learn about camera equipment and lighting.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a degree in Film, Media Studies, or Fine Arts from a program with strong production focus. Build a portfolio through short films. Many successful directors start as PAs or editors.',
      duration: '4 years + portfolio building'
    },
    real_world_examples: [
      {
        name: 'Steven Spielberg',
        role: 'Film Director',
        achievement: 'Pioneered blockbuster filmmaking and proved that directorial vision could move audiences emotionally while creating technological innovations in cinema.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Game Designer',
    slug: 'game-designer',
    primary_archetype: 'Creator',
    secondary_archetype: null,
    defensibility_score: 65,
    factor_physical_presence: 30,
    factor_human_judgment: 75,
    factor_creative_originality: 90,
    factor_relationship_dependency: 60,
    factor_regulatory_barrier: 25,
    entry_salary_low: 50000,
    entry_salary_high: 68000,
    mid_salary_low: 75000,
    mid_salary_high: 110000,
    senior_salary_low: 120000,
    senior_salary_high: 180000,
    day_to_day_description: 'You create the gameplay, rules, and experience of video games. You design levels, balance mechanics, create narratives, and figure out what\'s fun. You work with programmers, artists, and producers to bring your vision to life. You playtest constantly and iterate based on feedback.',
    ai_impact_analysis: 'AI can generate content and assist with game development, but game design is fundamentally about understanding human fun and creating meaningful experiences. Creative design, level design, and narrative remain distinctly human skills.',
    skills_to_develop: [
      {
        skill: 'Game Design Mechanics & Balance',
        priority: 'high',
        how_to_develop: 'Design tabletop games and mods for existing games. Study game theory and learn how to balance mechanics for engaging gameplay.'
      },
      {
        skill: 'Prototyping & Playtesting',
        priority: 'high',
        how_to_develop: 'Create prototypes using game engines like Unity or Unreal. Playtest extensively and iterate based on user feedback.'
      },
      {
        skill: 'Narrative & World Building',
        priority: 'medium',
        how_to_develop: 'Write stories and create game worlds. Study narrative structure and learn how to integrate story with gameplay.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a degree in Game Design or Game Development from a specialized program. Build a portfolio of game projects. Many designers start in QA or as level designers.',
      duration: '4 years + portfolio'
    },
    real_world_examples: [
      {
        name: 'Shigeru Miyamoto',
        role: 'Video Game Designer',
        achievement: 'Created iconic franchises like Super Mario and The Legend of Zelda, proving that game design is an art form requiring deep creative and mechanical understanding.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Culinary Chef',
    slug: 'culinary-chef',
    primary_archetype: 'Creator',
    secondary_archetype: 'Builder',
    defensibility_score: 80,
    factor_physical_presence: 100,
    factor_human_judgment: 80,
    factor_creative_originality: 90,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 60,
    entry_salary_low: 32000,
    entry_salary_high: 45000,
    mid_salary_low: 55000,
    mid_salary_high: 80000,
    senior_salary_low: 85000,
    senior_salary_high: 150000,
    day_to_day_description: 'You create dishes and menus that delight people. You manage a kitchen, source ingredients, develop recipes, and lead a team of cooks. You\'re part artist, part scientist, part business manager. Every dish is a creative expression, and every service is a performance.',
    ai_impact_analysis: 'AI can suggest recipes and optimize kitchen operations, but cooking is fundamentally about creativity, technique, and creating emotional experiences. Chef expertise in flavor profiles, technique, and understanding food culture is irreducibly human.',
    skills_to_develop: [
      {
        skill: 'Culinary Technique & Food Science',
        priority: 'high',
        how_to_develop: 'Attend culinary school and apprentice in professional kitchens. Master knife skills, cooking methods, and food chemistry.'
      },
      {
        skill: 'Menu Development & Creativity',
        priority: 'high',
        how_to_develop: 'Experiment with recipes, taste widely, and understand flavor combinations. Travel and experience different cuisines.'
      },
      {
        skill: 'Kitchen Management & Leadership',
        priority: 'medium',
        how_to_develop: 'Work up from line cook to executive chef. Learn food safety, cost control, and team leadership.'
      }
    ],
    education_path: {
      type: 'trade',
      details: 'Complete a culinary arts program at a culinary institute (2 years) or apprentice in a professional kitchen while attending culinary school.',
      duration: '2-3 years'
    },
    real_world_examples: [
      {
        name: 'Julia Child',
        role: 'Chef & Culinary Educator',
        achievement: 'Transformed American cooking by teaching that anyone could master French cuisine, bringing joy and accessibility to the culinary arts.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Music Producer',
    slug: 'music-producer',
    primary_archetype: 'Creator',
    secondary_archetype: null,
    defensibility_score: 60,
    factor_physical_presence: 30,
    factor_human_judgment: 75,
    factor_creative_originality: 85,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 20,
    entry_salary_low: 30000,
    entry_salary_high: 50000,
    mid_salary_low: 60000,
    mid_salary_high: 100000,
    senior_salary_low: 120000,
    senior_salary_high: 250000,
    day_to_day_description: 'You shape the sound of music. You work with artists to develop songs, arrange instrumentation, record, and mix tracks. You listen to countless demos, make creative decisions about arrangement and sound, and help artists find their voice. You\'re part talent scout, part creative director, part engineer.',
    ai_impact_analysis: 'AI can generate beats and assist with mixing, but music production is fundamentally about understanding emotion, taste, and helping artists achieve their vision. The human ear and creative judgment remain essential.',
    skills_to_develop: [
      {
        skill: 'Music Theory & Arrangement',
        priority: 'high',
        how_to_develop: 'Study music theory, composition, and orchestration. Arrange and produce music in multiple genres.'
      },
      {
        skill: 'Recording & Production Technology',
        priority: 'high',
        how_to_develop: 'Learn DAWs (Ableton, Pro Tools, Logic), understand recording techniques, and develop mixing and mastering skills.'
      },
      {
        skill: 'Artist Development & A&R',
        priority: 'medium',
        how_to_develop: 'Work with developing artists, understand music marketing, and learn how to identify talent and develop careers.'
      }
    ],
    education_path: {
      type: 'self_taught',
      details: 'Many producers are self-taught through experimentation with recording software and working with artists. Some earn degrees in music production or recording arts.',
      duration: 'Variable - 3-5 years to proficiency'
    },
    real_world_examples: [
      {
        name: 'Quincy Jones',
        role: 'Music Producer & Entrepreneur',
        achievement: 'Produced some of the best-selling albums ever, proving that production is an art requiring deep musical knowledge, technical skill, and artist understanding.'
      }
    ],
    status: 'active'
  },

  // CONNECTOR ARCHETYPE
  {
    title: 'High School Teacher',
    slug: 'high-school-teacher',
    primary_archetype: 'Connector',
    secondary_archetype: 'Healer',
    defensibility_score: 76,
    factor_physical_presence: 95,
    factor_human_judgment: 90,
    factor_creative_originality: 80,
    factor_relationship_dependency: 90,
    factor_regulatory_barrier: 80,
    entry_salary_low: 35000,
    entry_salary_high: 48000,
    mid_salary_low: 52000,
    mid_salary_high: 68000,
    senior_salary_low: 70000,
    senior_salary_high: 95000,
    day_to_day_description: 'You teach teenagers and shape how they think about the world. You prepare lessons, lead discussions, grade assignments, and mentor students. You\'re part educator, part counselor, part role model. You handle classroom management, inspire interest in your subject, and help students discover their potential.',
    ai_impact_analysis: 'AI can deliver information and personalized practice problems, but teaching is fundamentally about human connection, inspiration, and shaping character. Teachers provide mentorship, role modeling, and the ability to adapt to each student\'s needs.',
    skills_to_develop: [
      {
        skill: 'Subject Matter Expertise',
        priority: 'high',
        how_to_develop: 'Master your subject through a bachelor\'s degree. Stay current with your field and understand how it\'s evolving.'
      },
      {
        skill: 'Teaching & Pedagogy',
        priority: 'high',
        how_to_develop: 'Complete a teaching credential program. Practice different instructional methods and learn to differentiate for diverse learners.'
      },
      {
        skill: 'Classroom Management & Student Connection',
        priority: 'high',
        how_to_develop: 'Learn behavior management strategies, build relationships with students, and create an inclusive classroom environment.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in your subject. Complete a teaching credential program or pursue a Master\'s in Education with teacher preparation.',
      duration: '4-5 years'
    },
    real_world_examples: [
      {
        name: 'Jaime Escalante',
        role: 'High School Mathematics Teacher',
        achievement: 'Inspired disadvantaged students to excel in advanced mathematics, proving that great teachers can transform lives and overcome systemic barriers.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Sales Director',
    slug: 'sales-director',
    primary_archetype: 'Connector',
    secondary_archetype: 'Strategist',
    defensibility_score: 70,
    factor_physical_presence: 70,
    factor_human_judgment: 85,
    factor_creative_originality: 65,
    factor_relationship_dependency: 90,
    factor_regulatory_barrier: 40,
    entry_salary_low: 50000,
    entry_salary_high: 70000,
    mid_salary_low: 90000,
    mid_salary_high: 140000,
    senior_salary_low: 150000,
    senior_salary_high: 250000,
    day_to_day_description: 'You lead a sales team and drive revenue growth. You set targets, mentor sales reps, develop strategy, and close major deals. You spend time coaching your team, analyzing sales data, and building relationships with key customers. It\'s a mix of people management, strategy, and relationship building.',
    ai_impact_analysis: 'AI can provide leads and sales intelligence, but closing deals requires human connection, empathy, and relationship building. Sales leadership increasingly relies on AI-powered tools but requires human judgment and interpersonal skill.',
    skills_to_develop: [
      {
        skill: 'Sales Technique & Negotiation',
        priority: 'high',
        how_to_develop: 'Start in sales roles and learn customer psychology. Master negotiation, objection handling, and deal closing.'
      },
      {
        skill: 'Team Leadership & Coaching',
        priority: 'high',
        how_to_develop: 'Lead sales teams, mentor reps, and learn to motivate people to achieve targets. Develop emotional intelligence.'
      },
      {
        skill: 'Sales Analytics & Strategy',
        priority: 'medium',
        how_to_develop: 'Learn CRM systems, understand sales metrics, and develop go-to-market strategies. Study competitive markets.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Many sales leaders earn bachelor\'s degrees in business, marketing, or related fields. Success often comes from starting in sales roles and advancing through performance.',
      duration: '4 years + sales experience'
    },
    real_world_examples: [
      {
        name: 'Salesforce Executives',
        role: 'Sales Leadership',
        achievement: 'Built Salesforce from startup to the largest enterprise CRM, proving that great sales leadership drives innovation and growth.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Community Organizer',
    slug: 'community-organizer',
    primary_archetype: 'Connector',
    secondary_archetype: 'Guardian',
    defensibility_score: 74,
    factor_physical_presence: 85,
    factor_human_judgment: 90,
    factor_creative_originality: 80,
    factor_relationship_dependency: 95,
    factor_regulatory_barrier: 50,
    entry_salary_low: 30000,
    entry_salary_high: 42000,
    mid_salary_low: 48000,
    mid_salary_high: 65000,
    senior_salary_low: 70000,
    senior_salary_high: 95000,
    day_to_day_description: 'You mobilize people to tackle community issues. You listen to what community members care about, build coalitions, develop campaigns, and push for change. You might organize around housing, education, environmental issues, or workers\' rights. You spend time in communities, at meetings, and building relationships.',
    ai_impact_analysis: 'AI can help with data and messaging, but organizing fundamentally depends on human relationships, trust, and the ability to inspire collective action. The human connection and grassroots mobilization are irreplaceable.',
    skills_to_develop: [
      {
        skill: 'Community Relationship Building',
        priority: 'high',
        how_to_develop: 'Work in communities, listen deeply, and build trust. Learn how to identify leaders and support them.'
      },
      {
        skill: 'Campaign Strategy & Tactics',
        priority: 'high',
        how_to_develop: 'Study successful campaigns, learn pressure tactics, and understand how to win concrete gains. Work on real campaigns.'
      },
      {
        skill: 'Public Speaking & Facilitation',
        priority: 'medium',
        how_to_develop: 'Speak at community meetings, facilitate large groups, and learn to inspire action. Practice public speaking.'
      }
    ],
    education_path: {
      type: 'self_taught',
      details: 'Many community organizers learn through direct experience in organizations. Some earn degrees in social work, public policy, or community development. Mentorship is key.',
      duration: 'Variable - typically learn through 2-3 year immersion'
    },
    real_world_examples: [
      {
        name: 'Ella Baker',
        role: 'Community Organizer & Civil Rights Leader',
        achievement: 'Demonstrated that grassroots organizing and empowering community members is more powerful than top-down leadership for creating lasting social change.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Executive Recruiter',
    slug: 'executive-recruiter',
    primary_archetype: 'Connector',
    secondary_archetype: null,
    defensibility_score: 52,
    factor_physical_presence: 60,
    factor_human_judgment: 75,
    factor_creative_originality: 55,
    factor_relationship_dependency: 85,
    factor_regulatory_barrier: 25,
    entry_salary_low: 50000,
    entry_salary_high: 70000,
    mid_salary_low: 90000,
    mid_salary_high: 150000,
    senior_salary_low: 160000,
    senior_salary_high: 300000,
    day_to_day_description: 'You match top talent with senior leadership positions. You build relationships with executives, understand their strengths and motivations, and connect them to companies seeking leadership. You spend time making calls, having conversations, and building trust with people who can shape careers.',
    ai_impact_analysis: 'AI can screen candidates and identify prospects, but executive recruiting depends entirely on personal relationships, trust, and the ability to assess executive fit. These human skills are central to the role.',
    skills_to_develop: [
      {
        skill: 'Relationship Building & Influence',
        priority: 'high',
        how_to_develop: 'Build relationships in your industry, stay connected to executives, and develop influence. Network extensively.'
      },
      {
        skill: 'Talent Assessment',
        priority: 'high',
        how_to_develop: 'Learn to assess executive capabilities, understand organizational culture, and predict success. Work with executives over time.'
      },
      {
        skill: 'Negotiation & Deal Making',
        priority: 'medium',
        how_to_develop: 'Learn to negotiate between candidates and companies. Manage complex placement deals and understand compensation structures.'
      }
    ],
    education_path: {
      type: 'self_taught',
      details: 'Many executive recruiters come from sales, HR, or executive backgrounds. Learn through mentorship and experience building relationships in corporate environments.',
      duration: 'Variable - typically 3-5 years to expertise'
    },
    real_world_examples: [
      {
        name: 'Korn Ferry',
        role: 'Executive Search Firm',
        achievement: 'Built a global executive search business by proving that access to trusted relationships and industry expertise is invaluable for placing top leaders.'
      }
    ],
    status: 'active'
  },

  // GUARDIAN ARCHETYPE
  {
    title: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    primary_archetype: 'Guardian',
    secondary_archetype: null,
    defensibility_score: 71,
    factor_physical_presence: 40,
    factor_human_judgment: 85,
    factor_creative_originality: 70,
    factor_relationship_dependency: 55,
    factor_regulatory_barrier: 75,
    entry_salary_low: 60000,
    entry_salary_high: 78000,
    mid_salary_low: 90000,
    mid_salary_high: 125000,
    senior_salary_low: 140000,
    senior_salary_high: 190000,
    day_to_day_description: 'You protect companies from cyber attacks. You monitor systems for threats, analyze security incidents, implement safeguards, and stay ahead of hackers. You work with firewalls, encryption, threat intelligence, and complex networks. It\'s like being a digital security guard—always watching, always learning about new threats.',
    ai_impact_analysis: 'AI is becoming essential for threat detection and response, but cybersecurity requires human judgment to distinguish real threats from false positives, understand attacker behavior, and make strategic decisions. Analysts increasingly partner with AI tools.',
    skills_to_develop: [
      {
        skill: 'Network Security & Systems Administration',
        priority: 'high',
        how_to_develop: 'Build expertise in network architecture, firewalls, and IT systems. Get CompTIA Security+ or CEH certifications.'
      },
      {
        skill: 'Threat Analysis & Incident Response',
        priority: 'high',
        how_to_develop: 'Study threat intelligence, learn to analyze malware, and practice incident response. Complete GCIH or similar certifications.'
      },
      {
        skill: 'Compliance & Risk Management',
        priority: 'medium',
        how_to_develop: 'Understand security regulations (GDPR, HIPAA, PCI-DSS) and learn how to assess and manage security risks.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Cybersecurity, Computer Science, or Information Technology. Get industry certifications like Security+, CEH, or CISSP. Many roles require 2-3 years IT experience first.',
      duration: '4 years + certifications'
    },
    real_world_examples: [
      {
        name: 'Kevin Mitnick',
        role: 'Cybersecurity Expert',
        achievement: 'Transformed from famous hacker to security consultant, proving that understanding attacker mentality is critical for defending systems.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Environmental Scientist',
    slug: 'environmental-scientist',
    primary_archetype: 'Guardian',
    secondary_archetype: 'Explorer',
    defensibility_score: 69,
    factor_physical_presence: 75,
    factor_human_judgment: 80,
    factor_creative_originality: 75,
    factor_relationship_dependency: 60,
    factor_regulatory_barrier: 75,
    entry_salary_low: 40000,
    entry_salary_high: 55000,
    mid_salary_low: 60000,
    mid_salary_high: 85000,
    senior_salary_low: 90000,
    senior_salary_high: 130000,
    day_to_day_description: 'You study and protect the environment. You conduct field research, analyze pollution and climate data, assess environmental impacts of development, and recommend solutions. You might work for government agencies, nonprofits, or private companies. You combine fieldwork with lab work and data analysis.',
    ai_impact_analysis: 'AI can process environmental data at scale and model climate scenarios, but environmental science requires field expertise, complex systems thinking, and the ability to navigate policy tradeoffs. Expertise remains essential.',
    skills_to_develop: [
      {
        skill: 'Environmental Testing & Field Methods',
        priority: 'high',
        how_to_develop: 'Learn field sampling techniques, lab analysis, and environmental monitoring. Get hands-on experience in the field.'
      },
      {
        skill: 'Data Analysis & Modeling',
        priority: 'high',
        how_to_develop: 'Master statistics, GIS, and environmental modeling software. Learn to interpret complex environmental data.'
      },
      {
        skill: 'Regulatory & Policy Knowledge',
        priority: 'medium',
        how_to_develop: 'Understand environmental regulations (Clean Air Act, Clean Water Act, etc.). Learn how science informs policy decisions.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Environmental Science, Ecology, or Environmental Engineering. Many positions require a Master\'s degree for research or specialized roles.',
      duration: '4 years + optional Master\'s'
    },
    real_world_examples: [
      {
        name: 'Rachel Carson',
        role: 'Environmental Scientist & Writer',
        achievement: 'Used scientific research to expose the dangers of pesticides, launching the modern environmental movement and proving science\'s power to protect nature.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Police Detective',
    slug: 'police-detective',
    primary_archetype: 'Guardian',
    secondary_archetype: 'Explorer',
    defensibility_score: 77,
    factor_physical_presence: 85,
    factor_human_judgment: 90,
    factor_creative_originality: 75,
    factor_relationship_dependency: 80,
    factor_regulatory_barrier: 90,
    entry_salary_low: 42000,
    entry_salary_high: 58000,
    mid_salary_low: 62000,
    mid_salary_high: 85000,
    senior_salary_low: 90000,
    senior_salary_high: 125000,
    day_to_day_description: 'You investigate crimes and catch criminals. You analyze evidence, interview witnesses and suspects, build cases, and work with prosecutors. You combine detective work with strong communication skills and understanding of human psychology. The work is intellectually challenging and personally demanding.',
    ai_impact_analysis: 'AI can analyze crime patterns and assist with forensics, but detective work fundamentally requires human judgment, interpersonal skills, and the ability to understand human motivation. Core investigative work remains human-dependent.',
    skills_to_develop: [
      {
        skill: 'Investigation & Evidence Analysis',
        priority: 'high',
        how_to_develop: 'Start in patrol, learn investigative techniques, and study forensics and evidence handling. Work on cases with experienced detectives.'
      },
      {
        skill: 'Interview & Interrogation',
        priority: 'high',
        how_to_develop: 'Learn interview techniques, study human psychology, and practice building rapport with witnesses and suspects.'
      },
      {
        skill: 'Legal Knowledge & Case Building',
        priority: 'high',
        how_to_develop: 'Understand criminal law, evidence rules, and how to build prosecutable cases. Work closely with attorneys.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a high school diploma or GED. Most departments require 2-4 years patrol experience before becoming a detective. Some positions require college coursework or an associate\'s degree.',
      duration: '4 years + police training'
    },
    real_world_examples: [
      {
        name: 'Cold Case Detectives',
        role: 'Investigation Specialists',
        achievement: 'Using persistence, modern technology, and investigative skill, solve decades-old cases and bring closure to families, proving the value of dedicated detective work.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Compliance Officer',
    slug: 'compliance-officer',
    primary_archetype: 'Guardian',
    secondary_archetype: null,
    defensibility_score: 48,
    factor_physical_presence: 30,
    factor_human_judgment: 70,
    factor_creative_originality: 50,
    factor_relationship_dependency: 60,
    factor_regulatory_barrier: 80,
    entry_salary_low: 50000,
    entry_salary_high: 65000,
    mid_salary_low: 75000,
    mid_salary_high: 100000,
    senior_salary_low: 110000,
    senior_salary_high: 160000,
    day_to_day_description: 'You ensure companies follow laws and regulations. You develop compliance policies, train employees, audit operations, and respond to regulatory requirements. You work with lawyers, auditors, and senior management. It\'s detail-oriented work focused on reducing risk and preventing violations.',
    ai_impact_analysis: 'AI can identify compliance risks and automate monitoring, potentially reducing need for some compliance roles. However, judgment about regulatory strategy and responding to novel situations requires human expertise.',
    skills_to_develop: [
      {
        skill: 'Regulatory Knowledge & Legal Understanding',
        priority: 'high',
        how_to_develop: 'Study regulations relevant to your industry. Work with legal teams and stay current on compliance requirements.'
      },
      {
        skill: 'Risk Assessment & Audit',
        priority: 'high',
        how_to_develop: 'Learn audit procedures, risk assessment frameworks, and how to identify compliance gaps. Get certifications like CIA or CISA.'
      },
      {
        skill: 'Documentation & Process Development',
        priority: 'medium',
        how_to_develop: 'Develop policies and procedures. Learn to document compliance and create audit trails.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Business, Law, Accounting, or related field. Many roles require professional certifications like CIA, CISM, or industry-specific compliance certifications.',
      duration: '4 years + certifications'
    },
    real_world_examples: [
      {
        name: 'SOX Compliance Professionals',
        role: 'Compliance Leaders',
        achievement: 'Helped companies navigate Sarbanes-Oxley and other regulations, proving that strong compliance prevents scandals and protects shareholders.'
      }
    ],
    status: 'active'
  },

  // EXPLORER ARCHETYPE
  {
    title: 'Marine Biologist',
    slug: 'marine-biologist',
    primary_archetype: 'Explorer',
    secondary_archetype: 'Guardian',
    defensibility_score: 75,
    factor_physical_presence: 80,
    factor_human_judgment: 80,
    factor_creative_originality: 85,
    factor_relationship_dependency: 60,
    factor_regulatory_barrier: 80,
    entry_salary_low: 35000,
    entry_salary_high: 50000,
    mid_salary_low: 55000,
    mid_salary_high: 80000,
    senior_salary_low: 85000,
    senior_salary_high: 130000,
    day_to_day_description: 'You study marine ecosystems and ocean life. You conduct fieldwork on boats or underwater, collect specimens, analyze data, and work to understand and protect ocean environments. Some days you\'re diving collecting data, other days you\'re in labs analyzing specimens or writing research papers.',
    ai_impact_analysis: 'AI can help analyze marine data and model ocean systems, but marine biology requires field expertise, hands-on observation skills, and the ability to understand complex ecosystems. Core research skills remain irreducibly human.',
    skills_to_develop: [
      {
        skill: 'Field Research & Diving',
        priority: 'high',
        how_to_develop: 'Get SCUBA certification, learn fieldwork techniques, and spend time on research vessels. Develop hands-on observation skills.'
      },
      {
        skill: 'Data Analysis & Research Methods',
        priority: 'high',
        how_to_develop: 'Master statistics, GIS, and data analysis. Learn experimental design and proper research methodology.'
      },
      {
        skill: 'Species Identification & Taxonomy',
        priority: 'medium',
        how_to_develop: 'Study marine taxonomy, learn to identify species, and develop expertise in your research area.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Marine Biology or Biology with marine focus. Most research positions require a Master\'s or PhD degree.',
      duration: '4 years + graduate degree'
    },
    real_world_examples: [
      {
        name: 'Sylvia Earle',
        role: 'Marine Biologist & Ocean Explorer',
        achievement: 'Pioneered deep-sea exploration and ocean conservation, proving that hands-on marine research drives critical understanding of ocean ecosystems.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Investigative Journalist',
    slug: 'investigative-journalist',
    primary_archetype: 'Explorer',
    secondary_archetype: 'Guardian',
    defensibility_score: 68,
    factor_physical_presence: 70,
    factor_human_judgment: 85,
    factor_creative_originality: 85,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 55,
    entry_salary_low: 35000,
    entry_salary_high: 50000,
    mid_salary_low: 55000,
    mid_salary_high: 80000,
    senior_salary_low: 85000,
    senior_salary_high: 130000,
    day_to_day_description: 'You uncover hidden stories and expose wrongdoing. You interview sources, research documents, analyze data, and write compelling stories that matter. You investigate corruption, abuse, environmental destruction, or other important issues. It requires tenacity, skepticism, and strong writing.',
    ai_impact_analysis: 'AI can help analyze large datasets and find patterns, but investigative journalism depends on human relationships, trust-building with sources, and the judgment to distinguish truth from misinformation. Core investigation remains human-driven.',
    skills_to_develop: [
      {
        skill: 'Interviewing & Source Development',
        priority: 'high',
        how_to_develop: 'Practice interviewing, develop sources in your beat, and learn to build trust with sources. Work on real stories.'
      },
      {
        skill: 'Research & Data Analysis',
        priority: 'high',
        how_to_develop: 'Learn data journalism, FOIA requests, document analysis, and database investigation. Master spreadsheets and analysis tools.'
      },
      {
        skill: 'Writing & Storytelling',
        priority: 'high',
        how_to_develop: 'Write constantly, study great journalism, and develop a clear, compelling writing style. Get feedback from editors.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a degree in Journalism, English, or related field. Many reporters start at smaller outlets and build experience. Strong portfolios matter more than specific degrees.',
      duration: '4 years + newsroom experience'
    },
    real_world_examples: [
      {
        name: 'Bob Woodward & Carl Bernstein',
        role: 'Investigative Journalists',
        achievement: 'Uncovered Watergate scandal through persistent investigation and source development, proving journalism\'s power to hold power accountable.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Aerospace Engineer',
    slug: 'aerospace-engineer',
    primary_archetype: 'Explorer',
    secondary_archetype: 'Builder',
    defensibility_score: 79,
    factor_physical_presence: 70,
    factor_human_judgment: 85,
    factor_creative_originality: 85,
    factor_relationship_dependency: 65,
    factor_regulatory_barrier: 90,
    entry_salary_low: 60000,
    entry_salary_high: 75000,
    mid_salary_low: 85000,
    mid_salary_high: 115000,
    senior_salary_low: 125000,
    senior_salary_high: 175000,
    day_to_day_description: 'You design and improve aircraft and spacecraft. You work with teams on aerodynamics, structures, propulsion, and systems. You use simulation and testing to solve problems and push the boundaries of what\'s possible. You might work for aerospace companies, space agencies, or airlines.',
    ai_impact_analysis: 'AI is revolutionizing design optimization and simulations, allowing engineers to test thousands of designs. However, aerospace engineering requires deep physics understanding, judgment about safety, and innovation that combines with rather than replaces engineering expertise.',
    skills_to_develop: [
      {
        skill: 'Aerodynamics & Fluid Mechanics',
        priority: 'high',
        how_to_develop: 'Master thermodynamics, fluid mechanics, and aeronautical principles through engineering degree. Use CFD (Computational Fluid Dynamics) software.'
      },
      {
        skill: 'CAD & Simulation Software',
        priority: 'high',
        how_to_develop: 'Learn CATIA, ANSYS, MATLAB, and other aerospace design tools. Practice complex simulations and design optimization.'
      },
      {
        skill: 'Systems Thinking & Safety',
        priority: 'high',
        how_to_develop: 'Understand how aircraft systems integrate. Study failure analysis and learn to design for safety and reliability.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Aerospace Engineering (ABET accredited). Pursue Professional Engineer (PE) licensing. Many advanced roles require a Master\'s degree.',
      duration: '4 years + optional Master\'s'
    },
    real_world_examples: [
      {
        name: 'Elon Musk & SpaceX Engineers',
        role: 'Aerospace Engineers',
        achievement: 'Revolutionized space exploration by designing reusable rockets, proving that engineering innovation can dramatically reduce costs and expand access to space.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Archaeological Researcher',
    slug: 'archaeological-researcher',
    primary_archetype: 'Explorer',
    secondary_archetype: null,
    defensibility_score: 73,
    factor_physical_presence: 85,
    factor_human_judgment: 85,
    factor_creative_originality: 85,
    factor_relationship_dependency: 65,
    factor_regulatory_barrier: 75,
    entry_salary_low: 32000,
    entry_salary_high: 48000,
    mid_salary_low: 55000,
    mid_salary_high: 75000,
    senior_salary_low: 80000,
    senior_salary_high: 120000,
    day_to_day_description: 'You study human history by excavating and analyzing artifacts. You conduct fieldwork at dig sites, catalog findings, analyze materials, and piece together stories of past civilizations. You combine detective work with scientific analysis. Some seasons you\'re excavating, other times you\'re in labs studying artifacts.',
    ai_impact_analysis: 'AI can assist with artifact classification and pattern analysis, but archaeology fundamentally depends on field expertise, careful excavation technique, and the contextual judgment required to interpret findings. Hands-on skill remains central.',
    skills_to_develop: [
      {
        skill: 'Excavation & Field Methods',
        priority: 'high',
        how_to_develop: 'Participate in archaeological digs and learn proper excavation techniques. Understand stratigraphy and site documentation.'
      },
      {
        skill: 'Material Analysis & Dating',
        priority: 'high',
        how_to_develop: 'Learn radiocarbon dating, ceramic analysis, and artifact classification. Study in labs and gain hands-on experience.'
      },
      {
        skill: 'Research & Analysis',
        priority: 'medium',
        how_to_develop: 'Learn to interpret artifacts within cultural contexts. Study archaeological theory and develop research questions.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a Bachelor\'s degree in Archaeology or related field. Most research positions require a Master\'s degree in Archaeology. PhD required for university positions.',
      duration: '4 years + graduate degree'
    },
    real_world_examples: [
      {
        name: 'Dr. Sarah Parcak',
        role: 'Archaeologist & Satellite Imaging Expert',
        achievement: 'Used technology combined with traditional archaeology to discover thousands of previously unknown archaeological sites, proving innovation enhances archaeological discovery.'
      }
    ],
    status: 'active'
  },

  // OPERATOR ARCHETYPE
  {
    title: 'Air Traffic Controller',
    slug: 'air-traffic-controller',
    primary_archetype: 'Operator',
    secondary_archetype: 'Guardian',
    defensibility_score: 86,
    factor_physical_presence: 60,
    factor_human_judgment: 95,
    factor_creative_originality: 70,
    factor_relationship_dependency: 75,
    factor_regulatory_barrier: 95,
    entry_salary_low: 52000,
    entry_salary_high: 68000,
    mid_salary_low: 85000,
    mid_salary_high: 120000,
    senior_salary_low: 130000,
    senior_salary_high: 180000,
    day_to_day_description: 'You manage air traffic and keep planes safe. You guide pilots during takeoff, landing, and flight using radar and communication systems. You make split-second decisions managing dozens of aircraft simultaneously. The work requires intense focus, quick thinking, and unwavering attention to safety.',
    ai_impact_analysis: 'AI can assist with traffic optimization and provide alerting systems, but air traffic control fundamentally requires human judgment, quick decision-making under uncertainty, and the accountability that humans provide. Automation remains an assistant, not a replacement.',
    skills_to_develop: [
      {
        skill: 'Air Traffic Control Systems',
        priority: 'high',
        how_to_develop: 'Complete FAA ATC training program. Learn radar systems, communication protocols, and airport operations.'
      },
      {
        skill: 'Decision-Making Under Pressure',
        priority: 'high',
        how_to_develop: 'Develop through intense training and simulations. Practice managing multiple conflicting demands with perfect safety.'
      },
      {
        skill: 'Communication & Coordination',
        priority: 'high',
        how_to_develop: 'Master radio communication, coordination procedures, and working with pilots and other controllers.'
      }
    ],
    education_path: {
      type: 'apprenticeship',
      details: 'Complete the FAA Academy training program (7-10 weeks). Then undergo on-the-job training at an air traffic facility (2-3 years) before certification.',
      duration: '3-4 years total'
    },
    real_world_examples: [
      {
        name: 'Chesley Sullenberger',
        role: 'Airline Captain & Former Air Traffic Controller',
        achievement: 'Used air traffic control knowledge and exceptional judgment to safely land plane on Hudson River, saving all 155 people aboard.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Construction Project Manager',
    slug: 'construction-project-manager',
    primary_archetype: 'Operator',
    secondary_archetype: 'Builder',
    defensibility_score: 78,
    factor_physical_presence: 85,
    factor_human_judgment: 85,
    factor_creative_originality: 70,
    factor_relationship_dependency: 80,
    factor_regulatory_barrier: 80,
    entry_salary_low: 50000,
    entry_salary_high: 65000,
    mid_salary_low: 75000,
    mid_salary_high: 105000,
    senior_salary_low: 115000,
    senior_salary_high: 160000,
    day_to_day_description: 'You oversee construction projects from start to finish. You manage budgets, schedules, teams, and quality. You work with architects, contractors, and clients. You spend time at job sites, in meetings, and solving unexpected problems. Safety and quality are paramount.',
    ai_impact_analysis: 'AI can optimize scheduling and budgets, but construction management requires on-site presence, quick decision-making about problems, team leadership, and stakeholder management. Human judgment about safety and quality remains essential.',
    skills_to_develop: [
      {
        skill: 'Project Management & Scheduling',
        priority: 'high',
        how_to_develop: 'Learn project management software (Microsoft Project, Procore). Get PMP or construction-specific certifications.'
      },
      {
        skill: 'Construction Knowledge & Safety',
        priority: 'high',
        how_to_develop: 'Build deep knowledge of construction methods, materials, and codes. Complete OSHA training and develop safety expertise.'
      },
      {
        skill: 'Leadership & Problem-Solving',
        priority: 'high',
        how_to_develop: 'Lead teams through complex projects. Learn to solve problems creatively and keep projects on track.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a degree in Construction Management, Civil Engineering, or related field. Many project managers start as construction workers or supervisors and advance through experience.',
      duration: '4 years + experience'
    },
    real_world_examples: [
      {
        name: 'Great Project Managers',
        role: 'Construction Leadership',
        achievement: 'Manage complex projects like skyscrapers and infrastructure, proving that exceptional management and problem-solving deliver projects on time and on budget.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Logistics Coordinator',
    slug: 'logistics-coordinator',
    primary_archetype: 'Operator',
    secondary_archetype: null,
    defensibility_score: 55,
    factor_physical_presence: 70,
    factor_human_judgment: 65,
    factor_creative_originality: 50,
    factor_relationship_dependency: 65,
    factor_regulatory_barrier: 60,
    entry_salary_low: 32000,
    entry_salary_high: 45000,
    mid_salary_low: 50000,
    mid_salary_high: 70000,
    senior_salary_low: 75000,
    senior_salary_high: 110000,
    day_to_day_description: 'You coordinate the movement of goods and manage inventory. You track shipments, schedule pickups and deliveries, manage warehouse operations, and solve logistics problems. You use software to track everything and communicate with drivers, warehouses, and customers.',
    ai_impact_analysis: 'AI is rapidly automating route optimization and warehouse management, which could reduce coordination roles. However, problem-solving, vendor relationships, and responding to disruptions require human judgment.',
    skills_to_develop: [
      {
        skill: 'Logistics Software & Systems',
        priority: 'high',
        how_to_develop: 'Learn TMS (Transportation Management Systems) and WMS (Warehouse Management Systems). Study supply chain software.'
      },
      {
        skill: 'Problem-Solving & Troubleshooting',
        priority: 'high',
        how_to_develop: 'Work through real logistics problems—shipment delays, inventory discrepancies, routing issues. Develop quick thinking skills.'
      },
      {
        skill: 'Communication & Coordination',
        priority: 'medium',
        how_to_develop: 'Practice coordinating with multiple parties. Learn to communicate clearly about complex logistics situations.'
      }
    ],
    education_path: {
      type: 'degree',
      details: 'Earn a certificate or degree in Logistics or Supply Chain. Many coordinators start in entry-level warehouse or transportation roles and advance.',
      duration: '2-4 years'
    },
    real_world_examples: [
      {
        name: 'UPS & FedEx Operations',
        role: 'Logistics Leadership',
        achievement: 'Built world-class logistics networks that deliver millions of packages daily, proving that logistics coordination is essential infrastructure.'
      }
    ],
    status: 'active'
  },
  {
    title: 'Restaurant General Manager',
    slug: 'restaurant-general-manager',
    primary_archetype: 'Operator',
    secondary_archetype: 'Connector',
    defensibility_score: 72,
    factor_physical_presence: 95,
    factor_human_judgment: 85,
    factor_creative_originality: 70,
    factor_relationship_dependency: 85,
    factor_regulatory_barrier: 65,
    entry_salary_low: 40000,
    entry_salary_high: 55000,
    mid_salary_low: 60000,
    mid_salary_high: 85000,
    senior_salary_low: 90000,
    senior_salary_high: 140000,
    day_to_day_description: 'You run a restaurant. You manage staff, oversee operations, maintain quality and safety, manage budgets, and ensure customers have great experiences. You handle everything from hiring cooks to resolving customer complaints. You\'re part manager, part chef, part psychologist.',
    ai_impact_analysis: 'AI can help with scheduling and inventory management, but restaurant management fundamentally depends on real-time decisions, staff leadership, customer relationship building, and the judgment to balance competing priorities. Human leadership remains central.',
    skills_to_develop: [
      {
        skill: 'Restaurant Operations & Management',
        priority: 'high',
        how_to_develop: 'Work up from entry-level restaurant positions. Learn P&L management, food safety, and operations from experienced managers.'
      },
      {
        skill: 'Staff Leadership & Training',
        priority: 'high',
        how_to_develop: 'Lead restaurant teams, develop cultures, and train staff. Learn to motivate people in fast-paced environments.'
      },
      {
        skill: 'Customer Service & Problem Resolution',
        priority: 'high',
        how_to_develop: 'Handle customer issues with grace. Learn to turn complaints into loyalty and create great customer experiences.'
      }
    ],
    education_path: {
      type: 'apprenticeship',
      details: 'Most restaurant GMs work their way up from entry-level positions. Some earn degrees in Hospitality or Business. On-the-job training and mentorship are key.',
      duration: '5-7 years to GM role'
    },
    real_world_examples: [
      {
        name: 'Danny Meyer',
        role: 'Restaurant Leader & Hospitality Innovator',
        achievement: 'Built world-class restaurant groups by proving that exceptional operations, staff culture, and customer relationships drive restaurant success.'
      }
    ],
    status: 'active'
  }
];

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      'Missing SUPABASE_URL or SUPABASE_KEY environment variables'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // First, ensure archetype profiles exist
    const archetypes = [
      'Builder',
      'Healer',
      'Strategist',
      'Creator',
      'Connector',
      'Guardian',
      'Explorer',
      'Operator'
    ];

    console.log('Inserting archetype profiles...');
    const archetypeData = archetypes.map((name) => ({
      name,
      description: `The ${name} archetype represents a unique approach to career and contribution.`,
      color_hex: '#000000',
      icon_name: name.toLowerCase()
    }));

    const { error: archetypeError } = await supabase
      .from('archetype_profiles')
      .upsert(archetypeData, { onConflict: 'name' });

    if (archetypeError) {
      console.error('Error inserting archetypes:', archetypeError);
      process.exit(1);
    }

    console.log(`Inserted ${archetypes.length} archetype profiles`);

    // Insert careers
    console.log('Inserting careers...');
    const { error: careerError } = await supabase
      .from('careers')
      .insert(CAREERS);

    if (careerError) {
      console.error('Error inserting careers:', careerError);
      process.exit(1);
    }

    console.log(`Successfully inserted ${CAREERS.length} careers`);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
