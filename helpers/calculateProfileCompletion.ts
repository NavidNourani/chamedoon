import { User } from "@prisma/client";

export function calculateProfileCompletion(user: Partial<User>): number {
  const fields = [
    { name: 'username', weight: 1 },
    { name: 'photo', weight: 1 },
    { name: 'email', weight: 1 },
    { name: 'name', weight: 2 },
    { name: 'family', weight: 2 },
    { name: 'phone', weight: 1 },
    { name: 'telegramID', weight: 1 },
    { name: 'whatsappnumber', weight: 1 },
  ];

  const totalWeight = fields.reduce((sum, field) => sum + field.weight, 0);
  let completedWeight = 0;

  for (const field of fields) {
    if (user[field.name as keyof User]) {
      completedWeight += field.weight;
    }
  }

  const completionPercentage = (completedWeight / totalWeight) * 100;
  return Math.round(completionPercentage);
}
