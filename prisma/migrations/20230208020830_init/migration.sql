-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'participant');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Participant" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Rodeo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "date" TIMESTAMP(3),
    "notes" TEXT,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "Rodeo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RodeoEvent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3),
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "fee" INTEGER,
    "prize" INTEGER,
    "rodeoId" TEXT NOT NULL,

    CONSTRAINT "RodeoEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventEntry" (
    "participantId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "time" DECIMAL(65,30),
    "feePaid" BOOLEAN DEFAULT false,
    "horseName" TEXT,

    CONSTRAINT "EventEntry_pkey" PRIMARY KEY ("participantId","eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rodeo" ADD CONSTRAINT "Rodeo_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RodeoEvent" ADD CONSTRAINT "RodeoEvent_rodeoId_fkey" FOREIGN KEY ("rodeoId") REFERENCES "Rodeo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEntry" ADD CONSTRAINT "EventEntry_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEntry" ADD CONSTRAINT "EventEntry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "RodeoEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
