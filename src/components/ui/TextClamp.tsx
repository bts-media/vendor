import { Tooltip } from 'antd';
import styles from './TextClamp.module.css';

interface TextClampProps {
    text?: string | null;
    lines?: number;
    /** Uzun matn uchun tooltip ko'rsatish */
    withTooltip?: boolean;
}

const TextClamp = ({ text, lines = 2, withTooltip = true }: TextClampProps) => {
    if (!text) return <span className='text-muted'>—</span>;

    const content = (
        <span className={styles.clamp} style={{ WebkitLineClamp: lines }}>
            {text}
        </span>
    );

    return withTooltip ? <Tooltip title={text}>{content}</Tooltip> : content;
};

export default TextClamp;
