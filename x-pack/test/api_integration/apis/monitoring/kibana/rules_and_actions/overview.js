/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import fixture from './fixtures/overview.json';
import { getLifecycleMethods } from '../../data_stream';

export default function ({ getService }) {
  const supertest = getService('supertest');
  const { setup, tearDown } = getLifecycleMethods(getService);

  describe('overview', () => {
    const archive = 'x-pack/test/functional/es_archives/monitoring/kibana/rules_and_actions';
    const timeRange = {
      min: '2022-05-31T18:44:19.267Z',
      max: '2022-05-31T19:59:19.267Z',
    };

    before('load archive', () => {
      return setup(archive);
    });

    after('unload archive', () => {
      return tearDown();
    });

    it('should get data for the entire cluster', async () => {
      const { body } = await supertest
        .post('/api/monitoring/v1/clusters/SvjwrFv6Rvuqjm9-cSSVEg')
        .set('kbn-xsrf', 'xxx')
        .send({ timeRange, codePaths: ['all'] })
        .expect(200);
      expect(body).to.eql(fixture);
    });
  });
}
