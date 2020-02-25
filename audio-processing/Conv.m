clc;

x = [0, 0, 1, 2, 3, 0, 0];
h = [1,1,1];

y = conv(x, h, 'valid')

z = zeros(1,3);
for n = 1:4
    sum = 0;
    for k = 1:3
        sum = sum + x(n + k);
    end
    z(n) = sum;
end
z
        