/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { FtrProviderContext } from '../../common/ftr_provider_context';

// eslint-disable-next-line import/no-default-export
export default ({ loadTestFile }: FtrProviderContext): void => {
  describe('detection engine api security and spaces enabled - Group 1', function () {
    // !!NOTE: For new routes that do any updates on a rule, please ensure that you are including the legacy
    // action migration code. We are monitoring legacy action telemetry to clean up once we see their
    // existence being near 0.

    loadTestFile(require.resolve('./aliases'));
    loadTestFile(require.resolve('./add_actions'));
    loadTestFile(require.resolve('./update_actions'));
    loadTestFile(require.resolve('./add_prepackaged_rules'));
    loadTestFile(require.resolve('./check_privileges'));
    loadTestFile(require.resolve('./create_index'));
    loadTestFile(require.resolve('./create_rules'));
    loadTestFile(require.resolve('./preview_rules'));
    loadTestFile(require.resolve('./create_rules_bulk'));
    loadTestFile(require.resolve('./create_ml'));
    loadTestFile(require.resolve('./create_new_terms'));
    loadTestFile(require.resolve('./create_threat_matching'));
    loadTestFile(require.resolve('./delete_rules'));
    loadTestFile(require.resolve('./delete_rules_bulk'));
    loadTestFile(require.resolve('./export_rules'));
    loadTestFile(require.resolve('./find_rules'));
    loadTestFile(require.resolve('./generating_signals'));
    loadTestFile(require.resolve('./get_prepackaged_rules_status'));
    loadTestFile(require.resolve('./get_rule_execution_events'));
    loadTestFile(require.resolve('./import_rules'));
    loadTestFile(require.resolve('./import_export_rules'));
    loadTestFile(require.resolve('./legacy_actions_migrations'));
    loadTestFile(require.resolve('./read_rules'));
    loadTestFile(require.resolve('./resolve_read_rules'));
    loadTestFile(require.resolve('./update_rules'));
    loadTestFile(require.resolve('./update_rules_bulk'));
    loadTestFile(require.resolve('./patch_rules_bulk'));
    loadTestFile(require.resolve('./perform_bulk_action'));
    loadTestFile(require.resolve('./perform_bulk_action_dry_run'));
    loadTestFile(require.resolve('./patch_rules'));
    loadTestFile(require.resolve('./read_privileges'));
    loadTestFile(require.resolve('./open_close_signals'));
    loadTestFile(require.resolve('./get_signals_migration_status'));
    loadTestFile(require.resolve('./create_signals_migrations'));
    loadTestFile(require.resolve('./finalize_signals_migrations'));
    loadTestFile(require.resolve('./delete_signals_migrations'));
    loadTestFile(require.resolve('./timestamps'));
    loadTestFile(require.resolve('./runtime'));
    loadTestFile(require.resolve('./throttle'));
    loadTestFile(require.resolve('./ignore_fields'));
    loadTestFile(require.resolve('./migrations'));
  });
};
