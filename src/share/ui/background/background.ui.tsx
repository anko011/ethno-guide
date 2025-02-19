import {Box} from "@radix-ui/themes";
import styles from "./styles.module.css";

export function Background() {
    return (
        <Box className={styles.root}>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid" width="1920"
                 height="1080"
                 className={styles.svgRoot}
            >

                <g>
                    <linearGradient y2="0" y1="0" x2="1" x1="0" id="a">
                        <stop offset="0" stopColor="var(--teal-1)"></stop>
                        <stop offset="1" stopColor="var(--teal-5)"></stop>
                    </linearGradient>

                    <linearGradient y2="0" y1="0" x2="1" x1="0" id="b">
                        <stop offset="0" stopColor="var(--teal-1)"></stop>
                        <stop offset="1" stopColor="var(--teal-6)"></stop>
                    </linearGradient>

                    <linearGradient y2="0" y1="0" x2="1" x1="0" id="c">
                        <stop offset="0" stopColor="var(--teal-1)"></stop>
                        <stop offset="1" stopColor="var(--teal-7)"></stop>
                    </linearGradient>

                    <path opacity="0.4"
                          fill="url(#a)"
                          className={`${styles.wave} ${styles.wave1}`}
                          d="M 0 0 L 0 716.15 Q 192 567.61 384 536.04 T 768 562.46 T 1152 495.25 T 1536 394.63 T 1920 262.55 L 1920 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#a)"
                          className={`${styles.wave} ${styles.wave2}`}
                          d="M 0 0 L 0 633.593 Q 192 622.124 384 586.453 T 768 510.674 T 1152 531.83 T 1536 387.78 T 1920 288.57 L 1920 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#b)"
                          className={`${styles.wave} ${styles.wave3}`}
                          d="M 0 0 L 0 655.353 Q 192 552.55 384 523.757 T 768 487.315 T 1152 503.859 T 1536 372.617 T 1920 329.337 L 1920 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#b)"
                          className={`${styles.wave} ${styles.wave4}`}
                          d="M 0 0 L 0 617.535 Q 192 574.627 384 555.356 T 768 493.636 T 1152 470.152 T 1536 408.404 T 1920 228.801 L 1920 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#c)"
                          className={`${styles.wave} ${styles.wave5}`}
                          d="M 0 0 L 0 679.116 Q 192 658.075 384 623.73 T 768 567.583 T 1152 431.904 T 1536 374.88 T 1920 308.071 L 1920 0 Z"
                    />

                    <g></g>
                </g>
            </svg>
        </Box>
    )
}
