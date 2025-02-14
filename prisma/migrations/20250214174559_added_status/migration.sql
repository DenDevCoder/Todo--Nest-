-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('RUNNING', 'COMPLETED', 'PENDING', 'FAILED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'RUNNING';
