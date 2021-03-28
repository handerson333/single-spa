import React from 'react'
import e from '../event-bus'

export default class Root extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'When Angular receives message, we should see a confirmation here 😎'
    }

    this.messageHandler = this.messageHandler.bind(this)
  }

  componentDidMount() {
    e.on('received', this.messageHandler)
  }

  componentDidUnmount() {
    e.off('received', this.messageHandler)
  }

  messageHandler(message) {
    this.setState({
      message: message.text
    })
  }

  sendMessage() {
    e.emit('message', { text: 'Hello from React 👋' })
  }

  render() {
    return (
      <div className="react-side">
        <h1 >This was written in React</h1>
        <button onClick={this.sendMessage}>
          Send a message to Angular
          </button>

        {this.state.message}
      </div>
    )
  }
}