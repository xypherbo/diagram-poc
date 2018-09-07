import {
  AbstractNodeFactory,
  DiagramEngine,
  NodeModel,
} from "storm-react-diagrams";
import { CustomNodeWidget } from "./CustomNodeWidget";
import { CustomNodeModel } from "./CustomNodeModel";
import React, {
  Component
} from 'react';

export class CustomNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("custom");
	}

	generateReactWidget(diagramEngine, node){
		return <CustomNodeWidget engine={diagramEngine} node={node} />;
	}

	getNewInstance() {
		return new CustomNodeModel();
	}
}