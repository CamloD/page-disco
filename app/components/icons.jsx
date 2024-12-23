export function Instagram(props) {
  const { width = 100, height = 100, fill = "none", stroke = "currentColor"  } = props;
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-instagram"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg> 
  )
}

export function Facebook(props) {
  const { width = 100, height = 100, fill = "none", stroke = "currentColor"  } = props;

  return(
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}
      stroke={stroke}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-facebook"
      >
        <path d="M 19.253906 2 C 15.311906 2 13 4.0821719 13 8.8261719 L 13 13 L 8 13 L 8 18 L 13 18 L 13 30 L 18 30 L 18 18 L 22 18 L 23 13 L 18 13 L 18 9.671875 C 18 7.884875 18.582766 7 20.259766 7 L 23 7 L 23 2.2050781 C 22.526 2.1410781 21.144906 2 19.253906 2 z"/>
    </svg>
  )
}

export function Twitter(props) {
  const { width = 100, height = 100, fill = "none", stroke = "currentColor" } = props;

  return(
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill={fill} 
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-twitter"
    >
      <path d="M49,11.096c-1.768,0.784-3.664,1.311-5.658,1.552c2.035-1.22,3.597-3.151,4.332-5.448c-1.903,1.127-4.013,1.947-6.255,2.388c-1.795-1.916-4.354-3.11-7.186-3.11c-5.44,0-9.849,4.409-9.849,9.847c0,0.771,0.088,1.522,0.257,2.244c-8.184-0.412-15.441-4.332-20.299-10.29c-0.848,1.458-1.332,3.149-1.332,4.953c0,3.416,1.735,6.429,4.38,8.197c-1.616-0.051-3.132-0.495-4.46-1.233c0,0.042,0,0.082,0,0.125c0,4.773,3.394,8.748,7.896,9.657c-0.824,0.227-1.694,0.346-2.592,0.346c-0.636,0-1.253-0.062-1.856-0.178c1.257,3.909,4.892,6.761,9.201,6.84c-3.368,2.641-7.614,4.213-12.23,4.213c-0.797,0-1.579-0.044-2.348-0.137c4.356,2.795,9.534,4.425,15.095,4.425c18.114,0,28.022-15.007,28.022-28.016c0-0.429-0.011-0.856-0.029-1.275C46.012,14.807,47.681,13.071,49,11.096z"/>
      </svg>

  )
}