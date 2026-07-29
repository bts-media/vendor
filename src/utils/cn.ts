type ClassInput = string | false | null | undefined;

/** Shartli class nomlarini birlashtiradi: cn(styles.box, isActive && styles.active) */
export const cn = (...classes: ClassInput[]) => classes.filter(Boolean).join(' ');

export default cn;
