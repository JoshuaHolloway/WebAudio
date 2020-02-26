%% Compute DFT manually:
clc, clear, close all;


N = 5;
x = [1 2 3 2 1];
% x = [3 2 1 1 2]; % Modular wrap-around (periodic extension)
FFT_matlab = fft(x)

% Re-Create DCT and DFT
Y_DFT = zeros(1,N);
for k = 1:N
  if k == 1
    w = 1/sqrt(N);
  else
    w = sqrt(2/N);
  end
  SUM = 0;
  for n = 1:N
    w = exp(-(2*pi*1i)/(N));
    w = w.^((k-1)*(n-1));
    SUM = SUM + w .* x(n);
    Y_DFT(k) = SUM;
  end
end
Y_DFT

% error = abs(real(Y_DFT') - FFT_matlab);
error = Y_DFT - FFT_matlab;



figure,
subplot(5,1,1), stem(x, 'fill'),  title('x(n)');
subplot(5,1,2), stem(abs(FFT_matlab), 'fill'), title('Y_1(n) = |FFT(x(n))|');
subplot(5,1,3), stem(abs(Y_DFT), 'fill'), title('Y_2(n) = |DFT(x(n))|');
subplot(5,1,4), stem(real(error), 'fill'), title('Error Signal = Re(DFT_{manual}-FFT_{matlab})');
subplot(5,1,5), stem(imag(error), 'fill'), title('Error Signal = Im(DFT_{manual}-FFT_{matlab})');
