import { SubjectData, SubjectKey } from './types';

export const SUBJECTS: Record<SubjectKey, SubjectData> = {
  physics: {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
    questions: [
      {
        q: "A body of mass 2 kg is moving with velocity 10 m/s. What is its kinetic energy?",
        options: ["50 J", "100 J", "200 J", "20 J"],
        correct: 1
      },
      
    ]
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'green',
    gradient: 'from-green-500 to-green-700',
    topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
    questions: [
      {
        q: "The number of moles of NaOH in 40g is:",
        options: ["0.5", "1", "2", "4"],
        correct: 1
      },
      
    ]
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700',
    topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Vectors'],
    questions: [
      {
        q: "If f(x) = x² + 2x + 1, then f'(x) = ?",
        options: ["2x + 2", "x + 1", "2x + 1", "x² + 2"],
        correct: 0
      },
     
    ]
  }
};