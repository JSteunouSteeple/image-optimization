#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ImageOptimizationStack } from '../lib/image-optimization-stack'
import { REC_REGIONS } from '../lib/origin-shield'


const app = new cdk.App()
new ImageOptimizationStack(app, 'ImgTransformationStack', {
    env: {
        region: REC_REGIONS.EU_WEST_1
    }
})

