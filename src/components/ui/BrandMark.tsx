import styles from './BrandMark.module.css';

interface BrandMarkProps {
    /** Harf yoki qisqa matn ("K", "−20%") */
    label: string;
    /** Reklama beruvchining o'z brend rangi */
    color: string;
    size?: number;
    fontSize?: number;
    radius?: number;
}

const BrandMark = ({ label, color, size = 26, fontSize = 11, radius }: BrandMarkProps) => (
    <span
        className={styles.mark}
        style={{
            width: size,
            height: size,
            fontSize,
            background: color,
            borderRadius: radius,
        }}
    >
        {label}
    </span>
);

export default BrandMark;
