import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/platforms/ic_hrms_single.png',
    title: 'HRMS',
    description:
      'Automates HR tasks, streamlines processes, and manages employee data for efficient workforce management.',
  },
  {
    icon: ' /assets/icons/platforms/ic_inventory_single.png',
    title: 'Inventory Management',
    description:
      'To  tracks, organizes, and controls a company`s goods, ensuring optimal stock levels, reducing costs, and improving operational efficiency.',
  },
  {
    icon: ' /assets/icons/platforms/ic_warehouse_single.png',
    title: 'Warehouse Management',
    description:
      'To oversee the storage, handling, and movement of goods within a warehouse to optimize operations and customer satisfaction.',
  },
];

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        {/* <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            Minimal UI
          </Typography>
        </m.div> */}

        <m.div variants={varFade().inDown}>
          <Typography variant="h2">
            What Next.
            <br /> helps you?
          </Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {CARDS.map((card, index) => (
          <m.div variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                textAlign: 'center',
                boxShadow: { md: 'none' },
                bgcolor: 'background.default',
                p: (theme) => theme.spacing(10, 5),
                ...(index === 1 && {
                  boxShadow: (theme) => ({
                    md: `-40px 40px 80px ${
                      theme.palette.mode === 'light'
                        ? alpha(theme.palette.grey[500], 0.16)
                        : alpha(theme.palette.common.black, 0.4)
                    }`,
                  }),
                }),
              }}
            >
              <Box
                component="img"
                src={card.icon}
                alt={card.title}
                sx={{ mx: 'auto', width: 80, height: 60 }}
              />

              <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
}
