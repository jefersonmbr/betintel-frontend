import { useId } from 'react'
import { Avatar } from '@mui/material'
import { getTeamCrest } from '@/lib/teamCrest'

type Props = {
  teamName: string;
  size?: number;
}

// Silhueta estilizada de camisa de futebol (nao e' arte de nenhum clube -
// so' a forma generica de uma camisa) num viewBox 24x24.
const JERSEY_PATH =
  'M8 3 L3 6 L5 10 L7 9 L7 20 A1 1 0 0 0 8 21 L16 21 A1 1 0 0 0 17 20 ' +
  'L17 9 L19 10 L21 6 L16 3 L14 4.5 A2 2 0 0 1 10 4.5 Z'

export default function TeamBadge({ teamName, size = 32 }: Props) {
  const crest = getTeamCrest(teamName)
  const clipId = useId()

  if (crest.imageUrl) {
    return (
      <Avatar
        src={crest.imageUrl}
        alt={teamName}
        sx={{ width: size, height: size }}
      />
    )
  }

  const { primary, secondary, tertiary, pattern } = crest.kit
  const trim = secondary ?? 'rgba(0,0,0,0.35)'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={`Camisa do ${teamName}`}
    >
      <clipPath id={clipId}>
        <path d={JERSEY_PATH} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="24" height="24" fill={primary} />
        {pattern === 'stripes-h' && secondary && (
          <>
            <rect x="0" y="4" width="24" height="3" fill={secondary} />
            <rect x="0" y="11" width="24" height="3" fill={secondary} />
            <rect x="0" y="18" width="24" height="3" fill={secondary} />
          </>
        )}
        {pattern === 'stripes-v' && secondary && (
          <>
            <rect x="2" y="0" width="3" height="24" fill={secondary} />
            <rect x="10.5" y="0" width="3" height="24" fill={secondary} />
            <rect x="19" y="0" width="3" height="24" fill={secondary} />
          </>
        )}
        {pattern === 'sash' && secondary && (
          <rect x="-6" y="9.5" width="36" height="5" fill={secondary} transform="rotate(-40 12 12)" />
        )}
        {pattern === 'chest-bands' && secondary && tertiary && (
          <>
            <rect x="0" y="10" width="24" height="2" fill={secondary} />
            <rect x="0" y="12" width="24" height="2" fill={tertiary} />
          </>
        )}
      </g>
      <path d={JERSEY_PATH} fill="none" stroke={trim} strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}
