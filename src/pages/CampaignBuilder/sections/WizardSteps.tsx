import { Check } from 'lucide-react';
import { Fragment } from 'react';
import useLanguage from '~hooks/useLanguage';
import { cn } from '~utils/cn';
import styles from '../CampaignBuilder.module.css';
import { WIZARD_STEPS } from '../types';

interface WizardStepsProps {
    current: number;
    /** Foydalanuvchi yetib borgan eng uzoq qadam — undan keyingisiga o'tib bo'lmaydi */
    maxReached: number;
    onGoTo: (step: number) => void;
}

/** Topbar ichidagi qadamlar indikatori (HeaderSlot orqali joylashtiriladi) */
const WizardSteps = ({ current, maxReached, onGoTo }: WizardStepsProps) => {
    const { t } = useLanguage();

    return (
        <div className={styles.steps}>
            {WIZARD_STEPS.map((labelKey, index) => {
                const isDone = index < current;
                const isActive = index === current;

                return (
                    <Fragment key={labelKey}>
                        {index > 0 && <span className={styles.stepLine} />}
                        <button
                            type='button'
                            className={cn(
                                styles.step,
                                isActive && styles.stepActive,
                                isDone && styles.stepDone,
                            )}
                            disabled={index > maxReached}
                            onClick={() => onGoTo(index)}
                            aria-current={isActive ? 'step' : undefined}
                        >
                            <span className={styles.stepNum}>
                                {isDone ? <Check size={11} strokeWidth={3} /> : index + 1}
                            </span>
                            <span className={styles.stepLabel}>{t(labelKey)}</span>
                        </button>
                    </Fragment>
                );
            })}
        </div>
    );
};

export default WizardSteps;
