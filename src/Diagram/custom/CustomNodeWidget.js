import React, {
  Component
} from 'react';
import { CustomNodeModel } from "./CustomNodeModel";
import { PortWidget, BaseWidget, DefaultPortLabel } from "storm-react-diagrams";
import { map } from 'lodash'
export class CustomNodeWidget extends BaseWidget {

  constructor(props) {
    super("srd-default-node", props);
    this.state = {};
    console.log(this.props)
  }

  generatePort(port) {
    return <DefaultPortLabel model={port} key={port.id} />;
  }

  render() {
    return (
      <div {...this.getProps()} style={{ background: this.props.node.color }}>
        <div className={this.bem("__title")}>
          <div className={this.bem("__name")}>{this.props.node.name}</div>
        </div>
        <div className={this.bem("__ports")}>
          <div className={this.bem("__in")}>
            {map(this.props.node.getInPorts(), this.generatePort.bind(this))}
          </div>
          <div className={this.bem("__out")}>
            {map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
          </div>
        </div>
        <button style={{
          position: 'absolute',
        }} onClick={() => this.props.node.ee.emit('append-node',this.props.node)}>+</button>
        {this.props.node.open ? <div style={{
          position: 'absolute',
          backgroundColor: '#aaa',
          left: 60,
          top: 0,
          width: 50
        }}>
          <p>- menu1</p>
          <p>- menu2</p>
          <p>- menu3</p>
        </div> : null}

      </div>
    );
  }
}