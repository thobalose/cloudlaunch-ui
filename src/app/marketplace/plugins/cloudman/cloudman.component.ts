import { Component, Host, Input } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective } from '@angular/forms';

import { BasePluginComponent } from '../base-plugin.component';
import { Cloud } from '../../../shared/models/cloud';
import { CloudService } from '../../../shared/services/cloud.service';

@Component({
    selector: 'cloudman-config',
    templateUrl: './cloudman.component.html',
    inputs: ['initialConfig', 'cloud'],
    providers: [CloudService]
})

export class CloudManConfigComponent extends BasePluginComponent {
    hidePassword = false;
    @Input()
    set password (value: string) { this.hidePassword = true; this.cmClusterForm.controls['clusterPassword'].setValue(value); }
    get password(): string { return this.cmClusterForm.controls['clusterPassword'].value; }

    cluster: Object = {};
    clusterTypes: Object[] = [  // First element in the list if the default choice
        { 'id': 'Galaxy', 'text': 'SLURM cluster with Galaxy' },
        { 'id': 'Data', 'text': 'SLURM cluster only' },
        { 'id': 'None', 'text': 'Do not set cluster type now' }]
    showAdvanced: boolean = false;
    showSavedClusters: boolean = false;
    savedClusters: any[] = [];
    errorMessage: string;
    _cloud: Cloud;

    cmClusterForm: FormGroup;
    storageType = new FormControl('', Validators.required);

    get form(): FormGroup {
        return this.cmClusterForm;
    }

    get configName(): string {
        return "config_cloudman";
    }

    get cloud() {
        return this._cloud;
    }

    set cloud(value) {
        this._cloud = value;
    }

    constructor(fb: FormBuilder, @Host() parentContainer: FormGroupDirective,
                private _cloudService: CloudService) {
        super(fb, parentContainer);
        this.cmClusterForm = fb.group({
            'clusterPassword': [null, Validators.required],
            'storageType': this.storageType,
            'storageSize': [null],
            'clusterType': [null],
            'defaultBucket': [null, Validators.required],
            'masterPostStartScript': [null],
            'workerPostStartScript': [null],
            'clusterSharedString': [null],
            'extraUserData': [null]
        });
    }

    getInitialClusterType(): Object {
        return [this.clusterTypes[0]];
    }

    setClusterType(clusterType: any) {
        this.cmClusterForm.value['clusterType'] = clusterType.id;
    }

    toggleAdvanced() {
        this.showAdvanced = !this.showAdvanced;
    }

    fetchSavedClusters() {
        this.savedClusters = []
        //this._cloudService.getSavedClusters(this._cloud.slug)
        this._cloudService.getSavedClusters()
            .subscribe(savedClusters => this.savedClusters = savedClusters.map( sc => { sc.id = sc.cluster_name; sc.text = sc.cluster_name; return sc; })
            error => this.errorMessage = <any>error,
            () => {this.savedClusters = 'Select a saved cluster'; });
        this.showSavedClusters = true;
    }
}
