/** @jsx jsx */
import { jsx } from '@emotion/react';
import Paragraph from '#app/components/Paragraph';
import { InputProps } from '../types';
import Label from './FieldLabel';
import styles from './styles';
import InvalidMessageBox from './InvalidMessageBox';

export default ({
  id,
  name,
  handleChange,
  handleFocusOut,
  inputState,
  label,
  hasAttemptedSubmit,
}: InputProps) => {
  const {
    isValid,
    value = '',
    required,
    wasInvalid,
    wordLimit,
    messageCode,
  } = inputState ?? {};
  const hasWordLimit = !!wordLimit;
  const translation = `Maximum ${wordLimit} Words`; // hardcoded
  const describedByWordLimit = `${id}-wordLimit`;
  const useErrorTheme = hasAttemptedSubmit && !isValid;
  const labelId = `label-${id}`;
  const errorBoxId = `${id}-error`;

  return (
    <>
      <Label
        forId={id}
        id={labelId}
        required={required}
        useErrorTheme={useErrorTheme}
      >
        {label}
      </Label>
      {hasWordLimit && (
        <Paragraph
          css={styles.maxWordLabel(useErrorTheme)}
          fontVariant="sansRegular"
          size="brevier"
          id={describedByWordLimit}
        >
          {translation}
        </Paragraph>
      )}
      <textarea
        id={id}
        css={[
          styles.textField(useErrorTheme),
          styles.textArea,
          styles.focusIndicator,
        ]}
        name={name}
        value={value as string}
        onChange={e => handleChange(e.target.name, e.target.value)}
        onBlur={e => handleFocusOut(e.target.name)}
        {...(hasWordLimit && { 'aria-describedby': describedByWordLimit })}
        {...(!hasAttemptedSubmit && { 'aria-invalid': 'false' })}
        {...(hasAttemptedSubmit && {
          ...(wasInvalid && { 'aria-invalid': !isValid }),
          ...(required && !isValid && { 'aria-required': required }),
          ...(!isValid && {
            'aria-describedby':
              errorBoxId + (hasWordLimit ? ` ${describedByWordLimit}` : ''),
          }),
        })}
        rows={4}
      />
      {hasAttemptedSubmit && !isValid && (
        <InvalidMessageBox
          id={errorBoxId}
          messageCode={messageCode}
          suffix={label}
        />
      )}
    </>
  );
};
