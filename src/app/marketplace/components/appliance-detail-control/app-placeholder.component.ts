import { Component, ComponentRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { RuntimeCompiler } from '@angular/compiler';

declare var System: any;

@Component({
   selector: 'app-placeholder',
   template: `<span #content></span>`,
   inputs: ['initialConfig', 'componentPath', 'componentName'],
})
export class AppPlaceHolderComponent {
   initialConfig: any;

   _componentPath: string;
   _componentName: string;
   _currentComponent: ComponentRef<any>;

   get componentPath() {
      return this._componentPath;
   }

   set componentPath(value) {
      this.reloadComponentIfNeeded(value, this.componentName);
      this._componentPath = value;
   }

   get componentName() {
      return this._componentName;
   }

   set componentName(value) {
      this.reloadComponentIfNeeded(this.componentPath, value);
      this._componentName = value;
   }

   constructor(
      private viewContainerRef: ViewContainerRef,
      private compiler: RuntimeCompiler) {
   }

   private reloadComponentIfNeeded(componentPath: string, componentName: string) {
      if (componentPath && componentName && (this.componentPath != componentPath || this.componentName != componentName))
         this.reloadComponent();
   }

   private reloadComponent() {
      // Remove existing component
      if (this._currentComponent && this.viewContainerRef.length > 0) {
            this.viewContainerRef.remove(0);
      }
      // Add new component
      System.import(this.componentPath)
      .then((module: any) => { 
          let [moduleName, componentClass] = this.componentName.split("#");
          return module[moduleName];
      })
      .then((type: any) => {
          return this.compiler.compileModuleAndAllComponentsAsync(type)
      })
      .then((moduleWithFactories => {
          let [moduleName, componentClass] = this.componentName.split("#");
          const factory = moduleWithFactories.componentFactories.find(x => x.componentType.name === componentClass); // Crucial: componentType.name, not componentType!!
          this._currentComponent = this.viewContainerRef.createComponent(factory, 0,  this.viewContainerRef.injector);
          this._currentComponent.instance.initialConfig = this.initialConfig;
      }));
   }

}