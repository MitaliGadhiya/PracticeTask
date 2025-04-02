import { connect } from 'mongoose'

export class Connection {
  public async connections(): Promise<void> {
    return connect("mongodb://localhost:27017/PracticeTask")
      .then(() => {
        console.log("connection established")
      })
      .catch((error: Error) => {
       
        console.log(error)
      })
  }
}
