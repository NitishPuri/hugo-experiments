// Helper functions

function angle_trunc(a) {
  // Helper function to map all angles onto [-pi, pi]
  return ((a + Math.PI) % (Math.PI * 2)) - Math.PI
}

function distance_between(point1, point2) {
  // Computes distance between poin1 and point2.
  let dx = point1[0] - point2[0]
  let dy = point1[1] - point2[1]
  return sqrt(pow(dx, 2) + pow(dy, 2))
}

function mod(first, second) {
  return first - second * floor(first / second)
}

// Probability of z for 1-dim Gaussian with mean mu and var sigma.
function gaussian(mu, sigma, x) {
  return exp(-pow(mu - x, 2) / pow(sigma, 2) / 2) / sqrt(TWO_PI * pow(sigma, 2))
}

function randomGaussian_NP(mean = 0, std = 1) {
  if (std < 0.001) {
    return mean;
  }
  var x1, x2, rad, y1;
  do {
    x1 = random(2) - 1;
    x2 = random(2) - 1;
    rad = x1 * x1 + x2 * x2;
  } while (rad >= std || rad == 0);
  var c = sqrt(-2 * log(rad) / rad);
  return mean + x1 * c;
};

let GLOBAL_PARAMETERS = [null,
  {
    'test_case': 1,
    'target_x': 9.84595717195,
    'target_y': -3.82584680823,
    'target_heading': 1.95598927002,
    'target_period': -6,
    'target_speed': 2.23288537085,
    'target_line_length': 12,
    'hunter_x': -18.9289073476,
    'hunter_y': 18.7870153895,
    'hunter_heading': -1.94407132569,
    'random_move': 20
  },
  {
    'test_case': 2,
    'target_x': 9.26465282849,
    'target_y': -5.37198134722,
    'target_heading': 1.50733100266,
    'target_period': -3,
    'target_speed': 4.97835577487,
    'target_line_length': 15,
    'hunter_x': -18.7956415381,
    'hunter_y': 12.4047226453,
    'hunter_heading': -1.35305387284,
    'random_move': 20
  },
  {
    'test_case': 3,
    'target_x': -8.23729263767,
    'target_y': 0.167449172934,
    'target_heading': -2.90891604491,
    'target_period': -8,
    'target_speed': 2.86280919028,
    'target_line_length': 5,
    'hunter_x': -1.26626321675,
    'hunter_y': 10.2766202621,
    'hunter_heading': -2.63089786461,
    'random_move': 20
  },
  {
    'test_case': 4,
    'target_x': -2.18967022691,
    'target_y': 0.255925949831,
    'target_heading': 2.69251137563,
    'target_period': -12,
    'target_speed': 2.74140955105,
    'target_line_length': 15,
    'hunter_x': 4.07484976298,
    'hunter_y': -10.5384658671,
    'hunter_heading': 2.73294117637,
    'random_move': 20
  },
  {
    'test_case': 5,
    'target_x': 0.363231634197,
    'target_y': 15.3363820727,
    'target_heading': 1.00648485361,
    'target_period': 7,
    'target_speed': 4.01304863745,
    'target_line_length': 15,
    'hunter_x': -19.6386687235,
    'hunter_y': -13.6078079345,
    'hunter_heading': -2.18960549765,
    'random_move': 20
  },
  {
    'test_case': 6,
    'target_x': 19.8033444747,
    'target_y': 15.8607456499,
    'target_heading': 2.91674681677,
    'target_period': 10,
    'target_speed': 4.11574616586,
    'target_line_length': 1,
    'hunter_x': -13.483627167,
    'hunter_y': 7.60284054436,
    'hunter_heading': 2.45511184918,
    'random_move': 20
  },
  {
    'test_case': 7,
    'target_x': -17.2113204789,
    'target_y': 10.5496426749,
    'target_heading': -2.07830482038,
    'target_period': 3,
    'target_speed': 4.58689282387,
    'target_line_length': 10,
    'hunter_x': -7.95068213364,
    'hunter_y': -4.00088251391,
    'hunter_heading': 0.281505756944,
    'random_move': 20
  },
  {
    'test_case': 8,
    'target_x': 10.5639252231,
    'target_y': 13.9095062695,
    'target_heading': -2.92543870157,
    'target_period': 10,
    'target_speed': 2.2648280036,
    'target_line_length': 11,
    'hunter_x': 4.8678066293,
    'hunter_y': 4.61870594164,
    'hunter_heading': 0.356679261444,
    'random_move': 20
  },
  {
    'test_case': 9,
    'target_x': 13.6383033581,
    'target_y': -19.2494482213,
    'target_heading': 3.08457233661,
    'target_period': -5,
    'target_speed': 4.8813691359,
    'target_line_length': 8,
    'hunter_x': -0.414540470517,
    'hunter_y': 13.2698415309,
    'hunter_heading': -2.21974457597,
    'random_move': 20
  },
  {
    'test_case': 10,
    'target_x': -2.97944715844,
    'target_y': -18.7085807377,
    'target_heading': 2.80820284661,
    'target_period': 8,
    'target_speed': 3.67540398247,
    'target_line_length': 8,
    'hunter_x': 16.7631157868,
    'hunter_y': 8.8386686632,
    'hunter_heading': -2.91906838766,
    'random_move': 20
  }]
