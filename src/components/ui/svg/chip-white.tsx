import { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

const ChipWhite = forwardRef<SVGSVGElement, LucideProps>((props, ref) => {
  const { size = 35 } = props;

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 35 35" fill="none">
      <rect width="34.7713" height="34.7713" fill="url(#pattern0_14_1343)" />
      <defs>
        <pattern id="pattern0_14_1343" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_14_1343" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_14_1343"
          width="100"
          height="100"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
});

ChipWhite.displayName = 'ChipWhite';

export default ChipWhite;
