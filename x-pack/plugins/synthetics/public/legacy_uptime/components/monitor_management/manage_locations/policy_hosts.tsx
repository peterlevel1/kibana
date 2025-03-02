/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { Controller, FieldErrors, Control } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHealth,
  EuiSuperSelect,
  EuiText,
  EuiToolTip,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { PrivateLocation } from '../../../../../common/runtime_types';
import { selectAgentPolicies } from '../../../state/private_locations';

export const PolicyHostsField = ({
  isDisabled,
  errors,
  control,
  privateLocations,
}: {
  isDisabled: boolean;
  errors: FieldErrors;
  control: Control<PrivateLocation, any>;
  privateLocations: PrivateLocation[];
}) => {
  const { data } = useSelector(selectAgentPolicies);

  const policyHostsOptions = data?.items.map((item) => {
    const hasLocation = privateLocations.find((location) => location.policyHostId === item.id);
    return {
      disabled: Boolean(hasLocation),
      value: item.id,
      inputDisplay: (
        <EuiHealth
          color={item.status === 'active' ? 'success' : 'warning'}
          style={{ lineHeight: 'inherit' }}
        >
          {item.name}
        </EuiHealth>
      ),
      'data-test-subj': item.name,
      dropdownDisplay: (
        <EuiToolTip
          content={
            hasLocation?.name
              ? i18n.translate('xpack.synthetics.monitorManagement.anotherPrivateLocation', {
                  defaultMessage:
                    'This agent policy is already attached to location: {locationName}.',
                  values: { locationName: hasLocation?.name },
                })
              : undefined
          }
        >
          <>
            <EuiHealth
              color={item.status === 'active' ? 'success' : 'warning'}
              style={{ lineHeight: 'inherit' }}
            >
              <strong>{item.name}</strong>
            </EuiHealth>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiText size="s" color="subdued">
                  <p>
                    {AGENTS_LABEL} {item.agents}
                  </p>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s" color="subdued">
                  <p>{item.description}</p>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexGroup>
          </>
        </EuiToolTip>
      ),
    };
  });

  return (
    <EuiFormRow
      label={POLICY_HOST_LABEL}
      helpText={!errors?.policyHostId ? SELECT_POLICY_HOSTS : undefined}
      isInvalid={!!errors?.policyHostId}
      error={SELECT_POLICY_HOSTS}
    >
      <Controller
        name="policyHostId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <EuiSuperSelect
            disabled={isDisabled}
            fullWidth
            aria-label={SELECT_POLICY_HOSTS}
            placeholder={SELECT_POLICY_HOSTS}
            valueOfSelected={field.value}
            itemLayoutAlign="top"
            popoverProps={{ repositionOnScroll: true }}
            hasDividers
            isInvalid={!!errors?.policyHostId}
            options={policyHostsOptions ?? []}
            {...field}
          />
        )}
      />
    </EuiFormRow>
  );
};

const AGENTS_LABEL = i18n.translate('xpack.synthetics.monitorManagement.agentsLabel', {
  defaultMessage: 'Agents: ',
});

const SELECT_POLICY_HOSTS = i18n.translate('xpack.synthetics.monitorManagement.selectPolicyHost', {
  defaultMessage: 'Select agent policy',
});

const POLICY_HOST_LABEL = i18n.translate('xpack.synthetics.monitorManagement.policyHost', {
  defaultMessage: 'Agent policy',
});
