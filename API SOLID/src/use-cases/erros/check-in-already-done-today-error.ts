export class CheckInAlreadyDoneTodayError extends Error {
  constructor() {
    super('Check-in already done today.')
  }
}
