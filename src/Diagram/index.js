import React, {
  Component
} from 'react';
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  NodeModel,
  DiagramWidget,
  LinkModel,
  PointModel
} from "storm-react-diagrams";

import { CustomNodeFactory } from './custom/CustomNodeFactory'
import { CustomNodeModel } from './custom/CustomNodeModel'
import { EventEmitter } from 'eventemitter3'

class Diagram01 extends Component {

  constructor(props) {
    super(props)

    this.eventEmitter = new EventEmitter();

    this.eventEmitter.on('append-node', (e) => {
      console.log(e)
      this.appendNode()
    })

    //3-A) create a default node
    var node1 = new DefaultNodeModel("Start", "#CCCCCC");
    let port = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    //3-B) create another default node
    var node2 = new DefaultNodeModel("End", "rgb(192,255,0)");
    let port2 = node2.addInPort("In");
    node2.setPosition(100, 500);

    var customNode = new CustomNodeModel("Custom", "#FF0000", this.eventEmitter);
    let port3 = customNode.addInPort('In')
    let port4 = customNode.addOutPort('Out')

    // link the ports
    let link1 = port.link(port3);
    let link2 = port4.link(port2);

    customNode.addListener({
      selectionChanged: e => {
        if (e.isSelected) {
          e.entity.showMenu()
        } else {
          e.entity.hideMenu()
        }
      }
    })
    customNode.setPosition(100, 300);

    //4) add the models to the root graph
    this.props.model.addAll(node1, node2, link1, link2, customNode);
  }

  appendNode() {
    console.log(this.props)
    let model = this.props.engine.getDiagramModel();
    let selectedItem = model.getSelectedItems();
    console.log(model)

    let newNode;
    selectedItem.forEach((item) => {
      console.log(item)
      if (item instanceof NodeModel) {
        newNode = new DefaultNodeModel(new Date().getTime(), "#FF0000");
        let newInPort = newNode.addInPort('in')
        let newOutport = newNode.addOutPort('out')
        console.log(item.getOutPorts())
        let newOutLink = item.getOutPorts()[0].link(newInPort)
        newNode.setPosition(item.x, item.y + 100);
        model.addAll(newNode, newOutLink)
      }/*  else if (item instanceof PointModel) {
        if (!item.parent.getSourcePort().in) {
          console.log(item)
          let nodeOutport = item.parent.getSourcePort();
          let nodeOutTarget = item.parent.getTargetPort();
          let newOutLink = newNode.getOutPorts()[0].link(nodeOutTarget)
          console.log(nodeOutTarget)
          console.log(newOutLink)
          console.log( nodeOutTarget.getLinks())
          item.remove()
        
          model.addAll(newOutLink)

        }
      } */
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.appendNode()}> Append + link </button>
        <DiagramWidget className="container" diagramEngine={this.props.engine} maxNumberPointsPerLink={0} smartRouting={true} />
      </div>);
  }
}

export default () => {
  //1) setup the diagram engine
  var engine = new DiagramEngine();
  engine.installDefaultFactories();
  engine.registerNodeFactory(new CustomNodeFactory())

  //2) setup the diagram model
  var model = new DiagramModel();

  //5) load model into engine
  engine.setDiagramModel(model);

  //6) render the diagram!
  return <Diagram01 engine={engine} model={model} />;
};