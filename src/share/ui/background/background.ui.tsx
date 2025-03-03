import {Box} from "@radix-ui/themes";
import styles from "./styles.module.css";

export function Background() {
    return (
        <Box className={styles.root}>

            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 3840 2160"
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
                          d="M 0 0 L 0 1432.3 Q 384 1135.22 768 1072.08 T 1536 1124.92 T 2304 990.5 T 3072 789.26 T 3840 525.1 L 3840 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#a)"
                          className={`${styles.wave} ${styles.wave2}`}
                          d="M 0 0 L 0 1267.186 Q 384 1244.248 768 1172.906 T 1536 1021.348 T 2304 1063.66 T 3072 775.56 T 3840 577.14 L 3840 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#b)"
                          className={`${styles.wave} ${styles.wave3}`}
                          d="M 0 0 L 0 1310.706 Q 384 1105.1 768 1047.514 T 1536 974.63 T 2304 1007.718 T 3072 745.234 T 3840 658.674 L 3840 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#b)"
                          className={`${styles.wave} ${styles.wave4}`}
                          d="M 0 0 L 0 1235.07 Q 384 1149.254 768 1110.712 T 1536 987.272 T 2304 940.304 T 3072 816.808 T 3840 457.602 L 3840 0 Z"
                    />

                    <path opacity="0.4"
                          fill="url(#c)"
                          className={`${styles.wave} ${styles.wave5}`}
                          d="M 0 0 L 0 1358.232 Q 384 1316.15 768 1247.46 T 1536 1135.166 T 2304 863.808 T 3072 749.76 T 3840 616.142 L 3840 0 Z"
                    />

                    <g></g>
                </g>
            </svg>
        </Box>
    )
}
